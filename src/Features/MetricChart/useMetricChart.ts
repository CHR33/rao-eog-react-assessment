import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'urql';
import { IState } from '../../store';
import { Measurement, MultipleMeasurements } from '../../models';

import { actions } from './reducer';

const getQuery = (alias: string) => (`
	query($measurementQuery: [MeasurementQuery]) {
		getMultipleMeasurements(input: $measurementQuery) {
			metric,
			measurements {
				at,
				metric,
				${alias}: value,
				unit
			}
		}
	}
`);

const getSelectedMetrics = (state: IState) => state.metrics;

const getMeasurements = (state: IState) => state.measurements.measurementDataMap;

const currentTime = new Date().valueOf();
const thirtyMinutes = 90 * 60 * 1000;
const after = currentTime - thirtyMinutes;

export const useMetricChart = () => {
  const measurementDataMap = useSelector(getMeasurements);
  const {
    selectedMetrics,
    recentlySelectedMetric,
    recentlyDeletedMetric
  } = useSelector(getSelectedMetrics);
  const dispatch = useDispatch();

  const chartData = React.useMemo(() => {
    return Object.keys(measurementDataMap).reduce((result, key) => {
      return result.concat(measurementDataMap[key]);
    }, [] as Measurement[]);
  }, [measurementDataMap]);

  const measurementQuery = React.useMemo(
    () => {
    if (recentlySelectedMetric) {
      return  [{ metricName: recentlySelectedMetric, after, }];
    }
  }, [recentlySelectedMetric]);

  const [result, executeQuery] = useQuery<{ getMultipleMeasurements: MultipleMeasurements[] }>({
    query: getQuery(recentlySelectedMetric),
    variables: {
      measurementQuery,
    },
    pause: !measurementQuery,
  });

  const { data } = result;

  React.useEffect(() => {
    if (!data) return;

    const { getMultipleMeasurements } = data;

    dispatch(actions.measurementsDataRecevied(getMultipleMeasurements[0]));
  }, [data, dispatch, executeQuery]);

  React.useEffect(() => {
    if (recentlyDeletedMetric) {
      dispatch(actions.measurementsDataRecevied({
        metric: recentlyDeletedMetric,
        measurements: []
      }));
    }
  }, [recentlyDeletedMetric]);

  return {
    chartData,
    selectedMetrics,
  };
};
