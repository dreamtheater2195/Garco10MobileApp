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
                lohang: action.payload.lohang,
                dataDisplay: action.payload.dataDisplay
            }
        case types.FETCH_LOHANG_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default garco10;