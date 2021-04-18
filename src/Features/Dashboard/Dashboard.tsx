import React from 'react';

import { MetricDropDown } from '../MetricDropDown';

export default () => {
  return <Dashboard />;
};

const Dashboard = () => {
  return (
    <article>
      <MetricDropDown />
    </article>
  );
};
