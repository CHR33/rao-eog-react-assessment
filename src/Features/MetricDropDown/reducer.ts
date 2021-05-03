import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metrics = string[];

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  metrics: [] as Metrics,
  recentlyDeletedMetric: '',
  recentlySelectedMetric: '',
  selectedMetrics: [] as Metrics,
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
      const [seletedMetric] = action.payload.filter(m => !state.selectedMetrics.includes(m))
      const [deletedMetric] = state.selectedMetrics.filter(m => !action.payload.includes(m))
      state.selectedMetrics = action.payload;

      if (deletedMetric) {
        state.recentlyDeletedMetric = deletedMetric;
      }

      if (seletedMetric) {
        state.recentlySelectedMetric = seletedMetric;
      }
    },
  },
});

export const { reducer } = slice;
export const { actions } = slice;
