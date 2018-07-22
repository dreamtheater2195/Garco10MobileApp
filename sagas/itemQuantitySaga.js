import { take, call, actionChannel, select, put } from 'redux-saga/effects';
import * as types from '../actions';
import { API_BASE_URL } from '../constants/api';
import axios from 'axios';

function requestUpdateItemQuantity(currentRaChuyen) {
    const url = `${API_BASE_URL}/LoSanXuats`;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const requestConfig = {
        method: 'put',
        url: url,
        timeout: 2000,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: currentRaChuyen,
        cancelToken: source.token
    };
    const timer = setTimeout(() => {
        source.cancel();
    }, 3000);

    return axios(requestConfig).then(response => {
        clearTimeout(timer);
        return response.data;
    }).catch(err => { throw err });
}

function* handleItemQuantityChange(payload) {
    const isConnected = yield select(state => state.network.isConnected);
    const currentRaChuyen = {
        id_LoSanXuat: payload.loSxId,
        id_MauSanPham: payload.mauSpId,
        id_CoSanPham: payload.coSpId,
        soLuongRaChuyen: payload.soluongRaChuyen,
        id_NguoiNhap: payload.nguoiNhapId,
        thoiGianNhap: payload.createDate
    };

    const addtoQueueAction = { type: types.ADD_ACTION_TO_QUEUE, payload: currentRaChuyen };

    if (isConnected) {
        try {
            yield put({ type: types.SYNC_DATA });

            const data = yield call(requestUpdateItemQuantity, currentRaChuyen);
            console.log('requestUpdateItemQuantity', data);
            if (data == 1) {
                yield put({ type: types.SYNC_DATA_STOP });
            } else if (data == -1) {
                throw new Error;
            }
        } catch (err) {
            yield put(addtoQueueAction);
        }
    } else {
        yield put(addtoQueueAction);
    }
}

export default function* itemQuantityChangeSaga() {
    const chan = yield actionChannel(types.UPDATE_SOLUONG_RACHUYEN);
    while (true) {
        const { payload } = yield take(chan);
        yield call(handleItemQuantityChange, payload);
    }
}