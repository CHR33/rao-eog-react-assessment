import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const getSelectedMetrics = (state: IState) => state.metrics.selectedMetrics;
const getMeasurements = (state: IState) => state.measurements.measurements;

export default () => {
  const classes = useStyles();
  const selectedMetrics = useSelector(getSelectedMetrics);
  const measurements = useSelector(getMeasurements);

  const latestValues = React.useMemo(() => {
    const list = [] as { name: string; value: number }[];
    measurements.forEach(measurement => {
      selectedMetrics.forEach(metricName => {
        if (measurement.metric === metricName) {
          const [latestValue] = measurement.measurements.slice(-1);
          list.push({
            name: metricName,
            value: latestValue.value,
          });
        }
      });
    });
    return list;
  }, [measurements, selectedMetrics]);

  return (
    <section className={classes.root}>
      {latestValues.map(({ name, value }) => (
        <Card className={classes.card} key={`metric-${name}`}>
          <CardContent>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="h3">{value}</Typography>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};
