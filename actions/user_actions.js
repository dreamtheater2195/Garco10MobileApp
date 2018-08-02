import * as types from './types';

export const updateUsernameInputText = (text) => {
    return {
        type: types.UPDATE_USERNAME_INPUT_TEXT,
        payload: text
    }
}

export const updatePasswordInputText = (text) => {
    return {
        type: types.UPDATE_PASSWORD_INPUT_TEXT,
        payload: text
    }
}

export const checkLogin = (username, password) => {
    return {
        type: types.CHECK_LOGIN,
        payload: {
            username,
            password
        }
    }
}

export const checkLoginFailure = (err) => {
    return {
        type: types.CHECK_LOGIN_FAILURE,
        payload: err
    }
}

export const checkLoginSuccess = (user) => {
    return {
        type: types.CHECK_LOGIN_SUCCESS,
        payload: user
    }
}

export const logOut = () => ({ type: types.LOG_OUT });
