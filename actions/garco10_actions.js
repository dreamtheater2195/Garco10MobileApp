import * as types from './types';
import { API_BASE_URL } from '../constants/api';
import axios from 'axios';
import asyncForEach from '../utils/asyncForEach';

export const fetchLoHangSuccess = (data) => ({
    type: types.FETCH_LOHANG_SUCCESS,
    payload: data
});

export const fetchLoHangFailure = (err) => ({
    type: types.FETCH_LOHANG_FAILURE,
    payload: err
});

export const fetchDataLoHang = (ID_LoSanXuat, ID_DonVi) => {
    return {
        type: types.FETCH_LOHANG,
        payload: {
            ID_LoSanXuat,
            ID_DonVi
        }
    };
}

export const updateSLRaChuyen = (payload) => {
    return {
        type: types.UPDATE_SOLUONG_RACHUYEN,
        payload: payload
    };
}

export const syncQueueData = () => async (dispatch, getState) => {
    const { isConnected, actionQueue } = getState().network;

    if (isConnected) {
        dispatch({ type: types.SYNC_DATA });
        try {
            const url = `${API_BASE_URL}/LoSanXuats`;
            let count = 0;
            await asyncForEach(actionQueue, async (item) => {
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
                    data: item,
                    cancelToken: source.token
                };
                const timer = setTimeout(() => {
                    source.cancel();
                }, 3000);

                const { data } = await axios(requestConfig);

                if (data) {
                    clearTimeout(timer);
                    if (data == 1) {
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