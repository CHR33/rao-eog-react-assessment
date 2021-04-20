import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { MetricDropDown } from '../MetricDropDown';
import { SelectedMetricList } from '../SelectedMetricList';
import { MetricChart } from '../MetricChart';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  metrics: {
    display: 'flex',
  },
});

export default () => <Dashboard />;

const Dashboard = () => {
  const styles = useStyles();

  return (
    <article className={styles.container}>
      <div className={styles.metrics}>
        <SelectedMetricList />
        <MetricDropDown />
      </div>
      <MetricChart />
    </article>
  );
};
