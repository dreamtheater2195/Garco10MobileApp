import * as types from '../actions/types';
import initialState from '../store/initialState';

const garco10 = (state = initialState.garco10, action) => {
    switch (action.type) {
        case types.FETCH_LOHANG:
            return {
                ...state,
                fetching: true
            }
        case types.FETCH_LOHANG_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: '',
                lohang: action.payload.lohang
            }
        case types.FETCH_LOHANG_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        case types.UPDATE_SOLUONG_RACHUYEN:
            const index = state.lohang.findIndex((item) => item.iD_LoSanXuat == action.payload.loSxId);
            const item = state.lohang[index];

            const updatedItem = {
                ...item,
                soLuong_RaChuyen: action.payload.soLuong_RaChuyen,
                raChuyen_NgayHienTai: action.payload.raChuyen_NgayHienTai
            };
            const newlohang = Object.assign([], state.lohang, { [index]: updatedItem });
            return {
                ...state,
                lohang: newlohang
            }
        default:
            return state;
    }
}

export default garco10;