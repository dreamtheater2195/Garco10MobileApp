import { fork, all } from 'redux-saga/effects';
import loginFlowSaga from './loginFlowSaga';
import fetchDataSaga from './fetchDataSaga';
import itemQuantityChangeSaga from './itemQuantitySaga';
export default function* root() {
    yield all([
        fork(loginFlowSaga),
        fork(fetchDataSaga),
        fork(itemQuantityChangeSaga)
    ]);
}