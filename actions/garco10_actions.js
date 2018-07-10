import * as types from './types';
import { API_BASE_URL } from '../constants/api';
import axios from 'axios';
const fetchLoHangSuccess = (data) => ({
    type: types.FETCH_LOHANG_SUCCESS,
    payload: data
});

const fetchLoHangFailure = (err) => ({
    type: types.FETCH_LOHANG_FAILURE,
    payload: err
});

export const fetchDataLoHang = (ID_LoSanXuat, ID_DonVi) => async dispatch => {
    dispatch({ type: types.FETCH_LOHANG });
    try {
        const url = `${API_BASE_URL}/loSx/findAll?idLoSx=${ID_LoSanXuat}&idDonVi=${ID_DonVi}`;
        const { data } = await axios.get(url);
        if (data.results && data.results.length > 0) {
            dispatch(fetchLoHangSuccess({
                lohang: data.results
            }));
        } else {
            dispatch(fetchLoHangSuccess({
                lohang: []
            }));
        }
    }
    catch (err) {
        dispatch(fetchLoHangFailure('Không thể lấy danh sách lô sản xuất mới nhất'));
    }
}

export const updateSLRaChuyen = (payload, callback) => async (dispatch, getState) => {

    const { isConnected, actionQueue } = getState().network;

    console.log('Network', isConnected, actionQueue);

    let currentRaChuyen = null;
    let addtoQueueAction = null;

    if (payload) {
        dispatch({
            type: types.UPDATE_SOLUONG_RACHUYEN,
            payload: payload
        });
        currentRaChuyen = {
            userName: payload.userName,
            loSxId: payload.loSxId,
            mauSpId: payload.mauSpId,
            coSpId: payload.coSpId,
            soluongRaChuyen: payload.soluongRaChuyen,
            nguoiNhapId: payload.nguoiNhapId,
            createDate: payload.createDate
        };

        addtoQueueAction = { type: types.ADD_ACTION_TO_QUEUE, payload: currentRaChuyen };
    }
    if (isConnected) {
        try {
            const url = `${API_BASE_URL}/loSx/updateSlRaChuyenTheoMang`;
            const requestConfig = {
                method: 'post',
                url: url,
                timeout: 2000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {
                    currentRaChuyen: currentRaChuyen,
                    arrUnsaveRaChuyen: actionQueue
                }
            };
            const { data } = await axios(requestConfig);
            if (data.results) {
                if (data.results.returnValue == 1) {
                    dispatch({ type: types.SYNC_DATA_SUCCESS });
                    if (callback) callback();
                } else if (payload && data.results.returnValue == -1) {
                    dispatch(addtoQueueAction);
                }
            }
        } catch (err) {
            if (payload) dispatch(addtoQueueAction);
        }
    } else {
        if (payload) dispatch(addtoQueueAction);
    }
}