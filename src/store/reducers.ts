import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricsReducer } from '../Features/MetricDropDown/reducer';
import { reducer as measurementsReducer } from '../Features/MetricChart/reducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  measurements: measurementsReducer,
};
