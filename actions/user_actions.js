import * as types from './types';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

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
