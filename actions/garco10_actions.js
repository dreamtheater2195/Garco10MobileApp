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
        dispatch(fetchLoHangFailure('Không thể lấy danh sách lô sản xuất'));
    }
}

export const setDataLoHang = (lohang) => ({
    type: types.SET_DATA_LOHANG,
    payload: lohang
});