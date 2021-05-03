import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from 'urql';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { actions } from '../MetricChart/reducer';
import { NewMeasurement } from '../../models';
import { IState } from '../../store';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    margin: '20px',
    width: '60%',
  },
  card: {
    marginRight: '1rem',
    marginBottom: '1rem',
  },
});


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

const getSelectedMetricNames = (state: IState) => state.metrics.selectedMetrics;

export default () => {
  const classes = useStyles();
  const selectedMetrics = useSelector(getSelectedMetricNames);
  const dispatch = useDispatch();
  const [recentMetricValueMap, setRecentMetricValuesMap] = React.useState<{[x: string]: number}>({});

  const [subscriptionResult] = useSubscription<NewMeasurement>({
    query: metricSubscriptionQuery,
    variables: {},
  });

  React.useEffect(() => {
    const { data } = subscriptionResult;
    if (data) {
      const { metric, value } = data.newMeasurement;
      if (selectedMetrics.includes(metric)) {
        setRecentMetricValuesMap((previousState) => ({
          ...previousState,
          [metric]: value
        }));
      } else {
        setRecentMetricValuesMap((previousState) => {
          const { [metric]: omit, ...remainingMap } = previousState;
          return remainingMap;
        });
      }
      dispatch(actions.latestMeasurementDataReceived(data))
    }
  }, [subscriptionResult, selectedMetrics]);

  return (
    <section className={classes.root}>
      {Object.keys(recentMetricValueMap).map((metric) => (
        <Card className={classes.card} key={`metric-${metric}`}>
          <CardContent>
            <Typography variant="h6">{metric}</Typography>
            <Typography variant="h3">{recentMetricValueMap[metric]}</Typography>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
