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

const checkLogin = () => {
    return {
        type: types.CHECK_LOGIN
    }
}

const checkLoginFailure = (err) => {
    return {
        type: types.CHECK_LOGIN_FAILURE,
        payload: err
    }
}

const checkLoginSuccess = (user) => {
    return {
        type: types.CHECK_LOGIN_SUCCESS,
        payload: user
    }
}

export const fetchCheckLogin = (username, password) => async dispatch => {
    dispatch(checkLogin());
    try {
        const url = `${API_BASE_URL}/Authenticate`;
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const timer = setTimeout(() => {
            source.cancel();
        }, 7000);

        const { data } = await axios.post(url, {
            tenDangNhap: username,
            matKhau: password
        }, {
                timeout: 5000,
                cancelToken: source.token
            });
        if (data) {
            clearTimeout(timer);
            var user = {
                ID_NhanSu: data.iD_NhanSu,
                TenDangNhap: data.tenDangNhap,
                MatKhau: password,
                Ten_BoPhan: data.ten_BoPhan,
                ID_DonVi: data.iD_DonVi,
                Ten_DonVi: data.ten_DonVi
            }
            dispatch(checkLoginSuccess(user));
        } else {
            dispatch(checkLoginFailure('Wrong username or password.'));
        }
    } catch (error) {
        console.log('fetchCheckLogin error', error.message);
        dispatch(checkLoginFailure('Cannot connect to server. Try again later.'));
    }
}

export const logOut = () => async dispatch => {
    dispatch({ type: types.LOG_OUT });
}