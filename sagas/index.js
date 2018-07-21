import { fork, all } from 'redux-saga/effects';
import loginFlowSaga from './loginFlowSaga';
export default function* root() {
    yield all([
        fork(loginFlowSaga)
    ]);
}