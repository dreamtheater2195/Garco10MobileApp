import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import * as api from '../services/api';
import { syncDataStop } from '../actions/network_actions';
import { fetchDataLoHang } from '../actions/garco10_actions';

function* handleSyncData() {
    const { isConnected, actionQueue } = yield select(state => state.network);
    const { user } = yield select(state => state.auth);
    try {
        if (isConnected) {
            let count = 0;
            for (const item of actionQueue) {
                const data = yield call(api.requestUpdateItemQuantity, item);
                if (data == 1) {
                    count++;
                    yield put({ type: types.REMOVE_ACTION_FROM_QUEUE, payload: item });
                }
            };
            yield put(syncDataStop);
            if (count === actionQueue.length) {
                yield put(fetchDataLoHang(0, user.ID_DonVi));
            }
        }
    } catch (err) {
        yield put(syncDataStop);
    }
}

export default function* syncDataSaga() {
    yield takeLatest(types.SYNC_DATA, handleSyncData);
}