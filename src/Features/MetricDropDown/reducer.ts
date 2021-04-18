import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metrics = string[];

export type ApiErrorAction = {
  error: string;
};

const initialState: Metrics = [];

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricDataRecevied: (state, action: PayloadAction<Metrics>) => {
      state = [...action.payload];
    },
    metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => {
      console.log('error getting metrics');
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
