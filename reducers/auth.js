import * as types from '../actions/types';
import initialState from '../store/initialState';
const currentUser = (state = initialState.auth, action) => {
    switch (action.type) {
        case types.UPDATE_USERNAME_INPUT_TEXT:
            return {
                ...state,
                userName: action.payload
            }
        case types.UPDATE_PASSWORD_INPUT_TEXT:
            return {
                ...state,
                passWord: action.payload
            }
        case types.CHECK_LOGIN:
            return {
                ...state,
                fetching: true,
                error: ''
            };
        case types.CHECK_LOGIN_SUCCESS:
            return {
                ...state,
                ...initialState.auth,
                user: action.payload
            }
        case types.CHECK_LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                fetching: false
            }
        case types.LOG_OUT:
            return initialState.auth;
        default:
            return state;
    }
}

export default currentUser;