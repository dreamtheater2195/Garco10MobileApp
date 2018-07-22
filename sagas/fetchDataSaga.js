import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from '../actions';
import { API_BASE_URL } from '../constants/api';
import axios from 'axios';
import { fetchLoHangSuccess, fetchLoHangFailure } from '../actions';

function requestFetchData(ID_LoSanXuat, ID_DonVi) {
    const url = `${API_BASE_URL}/LoSanXuats?ID_LoSanXuat=${ID_LoSanXuat}&ID_DonVi=${ID_DonVi}`;
    return axios.get(url).then(response => response.data).catch(err => { throw err });
}
function* fetchData({ payload }) {
    const { ID_LoSanXuat, ID_DonVi } = payload;
    try {
        const data = yield call(requestFetchData, ID_LoSanXuat, ID_DonVi);
        yield put(fetchLoHangSuccess(data));
    } catch (err) {
        yield put(fetchLoHangFailure('Không thể lấy danh sách lô sản xuất mới nhất'));
    }
}

export default function* fetchDataSaga() {
    yield takeLatest(types.FETCH_LOHANG, fetchData);
}