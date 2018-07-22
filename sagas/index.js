import { fork, all } from 'redux-saga/effects';
import loginFlowSaga from './loginFlowSaga';
import fetchDataSaga from './fetchDataSaga';
import itemQuantityChangeSaga from './itemQuantitySaga';
import syncDataSaga from './syncDataSaga';
export default function* root() {
    yield all([
        fork(loginFlowSaga),
        fork(fetchDataSaga),
        fork(itemQuantityChangeSaga),
        fork(syncDataSaga)
    ]);
}