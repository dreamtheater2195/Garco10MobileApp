import * as types from './types';

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