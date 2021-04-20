import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metrics = string[];

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metrics: [] as Metrics,
  selectedMetrics: [] as Metrics
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricDataRecevied: (state, action: PayloadAction<Metrics>) => {
      state.metrics = [...action.payload];
    },
    metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => {
      console.log('error getting metrics');
    },
    metricSelectionUpdated: (state, action: PayloadAction<Metrics>) => {
      state.selectedMetrics = action.payload;
    }
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
