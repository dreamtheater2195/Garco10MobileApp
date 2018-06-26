import * as types from './types';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://192.168.0.110:1338/api/mobile';

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
        const url = `${BASE_URL}/checkLogin?userName=${username}&passWord=${password}`;
        const { data } = await axios.get(url);
        if (data.results && data.results.length > 0) {
            var user = {
                ID_NhanSu: data.results[0].ID_NhanSu,
                TenDangNhap: data.results[0].TenDangNhap,
                MatKhau: password,
                Ten_BoPhan: data.results[0].Ten_BoPhan,
                ID_DonVi: data.results[0].ID_DonVi,
                Ten_DonVi: data.results[0].Ten_DonVi,
                data: data.results
            }
            await AsyncStorage.setItem('UID1234', JSON.stringify(user));
            dispatch(checkLoginSuccess(user));
        } else {
            dispatch(checkLoginFailure('Wrong username or password.'));
        }
    } catch (err) {
        dispatch(checkLoginFailure('Cannot connect to server. Try again later.'));
    }
}

export const fetchGetUserLogin = () => async dispatch => {
    const user = await AsyncStorage.getItem('UID1234');
    if (user) {
        dispatch(checkLoginSuccess(JSON.parse(user)));
    }
    else {
        dispatch(checkLoginSuccess(null));
    }
}

export const logOut = () => async dispatch => {
    await AsyncStorage.removeItem('UID1234');
    dispatch({ type: types.LOG_OUT });
}