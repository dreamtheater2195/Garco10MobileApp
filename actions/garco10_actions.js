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
            return dispatch(fetchLoHangSuccess({
                lohang: data.results
            }));
        } else {
            return dispatch(fetchLoHangSuccess({
                lohang: []
            }));
        }
    }
    catch (err) {
        dispatch(fetchLoHangFailure('Không thể lấy danh sách lô sản xuất mới nhất'));
        throw err;
    }
}

export const updateSLRaChuyen = (payload, callback) => async (dispatch, getState) => {
    const { isConnected } = getState().network;

    dispatch({
        type: types.UPDATE_SOLUONG_RACHUYEN,
        payload: payload
    });
    const currentRaChuyen = {
        userName: payload.userName,
        loSxId: payload.loSxId,
        mauSpId: payload.mauSpId,
        coSpId: payload.coSpId,
        soluongRaChuyen: payload.soluongRaChuyen,
        nguoiNhapId: payload.nguoiNhapId,
        createDate: payload.createDate
    };

    const addtoQueueAction = { type: types.ADD_ACTION_TO_QUEUE, payload: currentRaChuyen };

    if (isConnected) {
        dispatch({ type: types.SYNC_DATA });
        try {
            const url = `${API_BASE_URL}/loSx/updateSlRaChuyenTheoMang`;
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();

            const requestConfig = {
                method: 'post',
                url: url,
                timeout: 2000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {
                    currentRaChuyen: currentRaChuyen
                },
                cancelToken: source.token
            };
            const timer = setTimeout(() => {
                source.cancel();
            }, 3000);
            const { data } = await axios(requestConfig);

            if (data.results) {
                clearTimeout(timer);
                if (data.results.returnValue == 1) {
                    return dispatch({ type: types.SYNC_DATA_STOP });
                } else if (data.results.returnValue == -1) {
                    dispatch(addtoQueueAction);
                    throw new Error;
                }
            }
        } catch (err) {
            dispatch(addtoQueueAction);
            throw err;
        }
    } else {
        dispatch(addtoQueueAction);
    }
}
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

export const syncQueueData = () => async (dispatch, getState) => {
    const { isConnected, actionQueue } = getState().network;

    if (isConnected) {
        dispatch({ type: types.SYNC_DATA });
        try {
            const url = `${API_BASE_URL}/loSx/updateSlRaChuyenTheoMang`;
            let count = 0;
            await asyncForEach(actionQueue, async (item) => {
                const CancelToken = axios.CancelToken;
                const source = CancelToken.source();

                const requestConfig = {
                    method: 'post',
                    url: url,
                    timeout: 2000,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    data: {
                        currentRaChuyen: item
                    },
                    cancelToken: source.token
                };
                const timer = setTimeout(() => {
                    source.cancel();
                }, 3000);

                const { data } = await axios(requestConfig);
                if (data.results) {
                    clearTimeout(timer);
                    if (data.results.returnValue == 1) {
                        dispatch({ type: types.REMOVE_ACTION_FROM_QUEUE, payload: item });
                        count++;
                    }
                }
            });
            dispatch({ type: types.SYNC_DATA_STOP });
            //if no item left in the queue
            if (count === actionQueue.length) {
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        } catch (err) {
            dispatch({ type: types.SYNC_DATA_STOP });
            throw err;
        }
    }
}