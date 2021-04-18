import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { actions } from './reducer';
import { useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '15px'
  },
});

const query = `
  query {
    getMetrics
  }
`;

const getMetrics = (state: IState) => {
  return state;
};

export default () => {
  return <MetricDropDown />;
};

const MetricDropDown = () => {
  const dispatch = useDispatch();
  const metrics = useSelector(getMetrics);
  const [result] = useQuery({ query });
  const styles = useStyles();

  const { fetching, data, error } = result;
  const { metricDataRecevied, metricApiErrorReceived } = actions;

  useEffect(() => {
    if (error) {
      dispatch(metricApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;

    dispatch(metricDataRecevied(data.getMetrics));
  }, [dispatch, data, error, metricDataRecevied, metricApiErrorReceived]);

  if (fetching) return <LinearProgress />;

  return <h2 className={styles.container}>Dropdown</h2>;
};
