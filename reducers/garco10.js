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
        case types.SET_DATA_LOHANG:
            const index = state.lohang.findIndex((item) => item.ID_LoSanXuat === action.payload.ID_LoSanXuat);
            const newlohang = Object.assign([], state.lohang, { [index]: action.payload });
            return {
                ...state,
                lohang: newlohang
            }
        default:
            return state;
    }
}

export default garco10;