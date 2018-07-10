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

export const updateSLRaChuyen = (data) => async dispatch => {
    dispatch({
        type: types.UPDATE_SOLUONG_RACHUYEN,
        payload: data
    });
    const currentRaChuyen = {
        userName: data.userName,
        loSxId: data.loSxId,
        mauSpId: data.mauSpId,
        coSpId: data.coSpId,
        soluongRaChuyen: data.soluongRaChuyen,
        nguoiNhapId: data.nguoiNhapId,
        createDate: data.createDate
    };
    // try {
    //     const url = `${API_BASE_URL}/loSx/updateSlRaChuyenTheoMang`;
    //     const requestConfig = {
    //         method: 'post',
    //         url: url,
    //         timeout: 3000,
    //         data: {
    //             currentRaChuyen: currentRaChuyen
    //         }
    //     };
    //     const { data } = await axios(requestConfig);
    //     if (data.results && data.results.returnValue == 1) {
    //         dispatch({ type: types.UPDATE_SOLUONG_RACHUYEN_SUCCESS });
    //     } else {
    //         //add to action queue
    //         dispatch({ type: types.ADD_ACTION_TO_QUEUE, payload: currentRaChuyen });
    //     }
    // } catch (err) {
    //     dispatch({ type: types.ADD_ACTION_TO_QUEUE, payload: currentRaChuyen });
    // }
}