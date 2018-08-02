import { take, call, actionChannel, select, put } from 'redux-saga/effects';
import * as types from '../actions';
import * as api from '../services/api';
import { isConnectedSelector } from '../selectors';
function* handleItemQuantityChange(payload) {
    const isConnected = yield select(isConnectedSelector);
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
            const data = yield call(api.requestUpdateItemQuantity, currentRaChuyen);
            if (data == -1) {
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