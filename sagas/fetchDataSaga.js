import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from '../actions';
import { fetchLoHangSuccess, fetchLoHangFailure } from '../actions';
import * as api from '../services/api';

function* handleFetchData({ payload }) {
    const { ID_LoSanXuat, ID_DonVi } = payload;
    try {
        const data = yield call(api.requestFetchData, ID_LoSanXuat, ID_DonVi);
        yield put(fetchLoHangSuccess(data));
    } catch (err) {
        yield put(fetchLoHangFailure('Không thể lấy danh sách lô sản xuất mới nhất'));
    }
}

export default function* fetchDataSaga() {
    yield takeLatest(types.FETCH_LOHANG, handleFetchData);
}