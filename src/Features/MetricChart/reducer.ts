import { createSlice, PayloadAction } from 'redux-starter-kit';
import { NewMeasurement, MultipleMeasurements } from '../../models';

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  measurements: [] as MultipleMeasurements[],
};

const slice = createSlice({
  name: 'metricsChartData',
  initialState,
  reducers: {
    measurementsDataRecevied: (state, action: PayloadAction<MultipleMeasurements[]>) => {
      state.measurements = [...action.payload];
    },
    measurementsDataApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => {
      console.log('error getting metrics measurement data');
    },
    newMeasurementDataReceived: (state, action: PayloadAction<NewMeasurement>) => {
      const { newMeasurement } = action.payload;
      const measurements = state.measurements.slice();
      measurements.forEach((measurement) => {
        if (measurement.metric === newMeasurement.metric) {
          measurement.measurements.push(newMeasurement);
          measurements.shift();
        }
      });
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
