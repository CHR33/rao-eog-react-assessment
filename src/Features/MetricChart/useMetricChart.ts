import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery, useSubscription } from 'urql';
import { IState } from '../../store';
import { Measurement, NewMeasurement, MultipleMeasurements } from '../../models';

import { actions } from './reducer';

const query = `
	query($measurementQuery: [MeasurementQuery]) {
		getMultipleMeasurements(input: $measurementQuery) {
			metric,
			measurements {
				at,
				metric,
				value,
				unit
			}
		}
	}
`;

const metricSubscriptionQuery = `
  subscription {
    newMeasurement{
      metric
      at
      value
      unit
    }
  }
`;

const getSelectedMetrics = (state: IState) => state.metrics;

const getMeasurements = (state: IState) => [...state.measurements.measurements];

const currentTime = new Date().valueOf();
const thirtyMinutes = (90 * 60 * 1000);
const after = currentTime - thirtyMinutes;

export const useMetricChart = () => {
  const measurements = useSelector(getMeasurements);
  const { selectedMetrics } = useSelector(getSelectedMetrics);
  const dispatch = useDispatch();

  const [subscriptionResult] = useSubscription<NewMeasurement>({
    query: metricSubscriptionQuery,
    variables: {},
  });

  const measurementQuery = React.useMemo(() => {
    return selectedMetrics.map((metricName) => ({
      metricName,
      after,
    }));
  }, [selectedMetrics]);

  const chartData = React.useMemo(() => {
    const newChartData: Measurement[][] = [];
   
    measurements.forEach((item) => newChartData.push(item.measurements));
  
    const mappedData = newChartData.flat().map(item => {
      const newValue = { ...item };
      newValue[newValue.metric] = newValue.value;
      return newValue;
    });

    return mappedData;
  }, [measurements]);

  const [result, executeQuery] = useQuery<{ getMultipleMeasurements: MultipleMeasurements[] }>({
    query,
    variables: {
      measurementQuery,
		},
		pause: measurementQuery.length === 0,
  });

  const { data } = result;

  React.useEffect(() => {
    if (!data) return;

		const { getMultipleMeasurements } = data;

    dispatch(actions.measurementsDataRecevied(getMultipleMeasurements));
  }, [data, dispatch, executeQuery]);

  React.useEffect(() => {
    if (subscriptionResult.data) {
      dispatch(actions.newMeasurementDataReceived(subscriptionResult.data));
    }
  }, [dispatch, subscriptionResult]);

  return {
    chartData,
    selectedMetrics,
  };
};
