import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { MetricDropDown } from '../MetricDropDown';
import { SelectedMetricList } from '../SelectedMetricList';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
});

export default () => {
  return <Dashboard />;
};

const Dashboard = () => {
  const styles = useStyles();

  return (
    <article className={styles.container}>
      <MetricDropDown />
      <SelectedMetricList />
    </article>
  );
};
