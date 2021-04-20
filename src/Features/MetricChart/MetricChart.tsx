import React from 'react';
import moment from 'moment';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Label, ResponsiveContainer, Tooltip} from 'recharts';

import { useMetricChart } from './useMetricChart';

export default () => (
  <MetricChart />
);

const MetricChart = () => {
  const { chartData, selectedMetrics } = useMetricChart();

  const xAxisTickFormatter = (date: number) => {
    return moment.unix(date).format("LT");
  };


  const hasTempData = selectedMetrics.some((item) => ['waterTemp', 'oilTemp', 'flareTemp'].includes(item));
  const hasPSIData = selectedMetrics.some((item) => ['tubingPressure', 'casingPressure'].includes(item));
  const hasInjData = selectedMetrics.some((item) => ['injValveOpen'].includes(item));

  if (chartData.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="at"
        domain={['auto', 'auto']}
        type="number"
        tickFormatter={xAxisTickFormatter}
      />
      {hasTempData && (
        <YAxis
          orientation="left"
          yAxisId="F"
        >
          <Label
            offset={20}
            position="bottom"
            style={{ textAnchor: "middle" }}
            value="F"
          />
        </YAxis>
      )}
      {hasPSIData && (
        <YAxis yAxisId="PSI">
          <Label
            offset={20}
            position="bottom"
            style={{ textAnchor: "middle" }}
            value="PSI"
          />
        </YAxis>
      )}
      {hasInjData && (
        <YAxis
          orientation="left"
          yAxisId="%"
        >
          <Label
            offset={20}
            position="bottom"
            style={{ textAnchor: "middle" }}
            value="%"
          />
        </YAxis>
      )}
      <Legend />
      <Tooltip labelFormatter={(label) => moment(label).format('LLLL')} />
      {selectedMetrics.length > 0
        ? selectedMetrics.map(metricName => {
            const color = colorCodes[metricName] as string;
            switch(metricName) {
              case 'waterTemp':
              case 'flareTemp':
              case 'oilTemp':
                return (
                  <Line
                    activeDot={{ r: 5 }}
                    dataKey={metricName}
                    dot={false}
                    isAnimationActive={false}
                    name={metricName}
                    key={`line-${metricName}`}
                    stroke={color}
                    type="monotone"
                    yAxisId="F"
                  />
                );
              case 'tubingPressure':
              case 'casingPressure':
                return (
                  <Line
                    activeDot={{ r: 5 }}
                    dataKey={metricName}
                    dot={false}
                    isAnimationActive={false}
                    key={`line-${metricName}`}
                    name={metricName}
                    stroke={color}
                    type="monotone"
                    yAxisId="PSI"
                  />
                );
              case 'injValveOpen':
                return (
                  <Line
                    activeDot={{ r: 5 }}
                    dataKey={metricName}
                    dot={false}
                    isAnimationActive={false}
                    key={`line-${metricName}`}
                    name={metricName}
                    stroke={color}
                    type="monotone"
                    yAxisId="%"
                  />
                );
              default:
                return null;
            }
          })
        :
      null}
    </LineChart>
    </ResponsiveContainer>
  );
};

const colorCodes = {
  oilTemp: '#311B92',
  waterTemp: '#F57F17',
  flareTemp: '#FFAB00',
  tubingPressure: '#BF360C',
  casingPressure: '#880E4F',
  injValveOpen: '#006064',
} as { [x: string]: string};
