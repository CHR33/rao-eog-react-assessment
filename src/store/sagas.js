import { all, spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricsSaga from '../Features/MetricDropDown/saga';

export default function* root() {
  yield all([spawn(weatherSaga), spawn(metricsSaga)]);
}
