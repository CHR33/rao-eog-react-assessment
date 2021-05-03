import { createSlice, PayloadAction } from 'redux-starter-kit';
import { NewMeasurement, Measurement, MultipleMeasurements } from '../../models';

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  measurementDataMap: {} as { [x: string]: Measurement[] },
};

const slice = createSlice({
  name: 'metricsChartData',
  initialState,
  reducers: {
    measurementsDataRecevied: (state, action: PayloadAction<MultipleMeasurements>) => {
      const { metric, measurements } = action.payload;

      state.measurementDataMap[metric] = measurements;
    },
    measurementsDataDeleted: (state, action: PayloadAction<string>) => {
      const metricName = action.payload;

      state.measurementDataMap[metricName] = [];
    },
    measurementsDataApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => {
      console.log('error getting metrics measurement data');
    },
    latestMeasurementDataReceived: (state, action: PayloadAction<NewMeasurement>) => {
      const { newMeasurement } = action.payload;
      const { metric, value } = newMeasurement;
      if (state.measurementDataMap[metric]) {
        state.measurementDataMap[metric].push({
          ...newMeasurement,
          [metric]: value,
        });
      }
    },
  },
});

export const { reducer } = slice;
export const { actions } = slice;
