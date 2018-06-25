import * as types from './types';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { SERVER_API } from '../constants/api';

const BASE_URL = 'http://192.168.31.45:1338/api/mobile';

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
                isLoggedIn: true,
                ID_NhanSu: data.results[0].ID_NhanSu,
                TenDangNhap: data.results[0].TenDangNhap,
                Ten_BoPhan: data.results[0].Ten_BoPhan,
                ID_DonVi: data.results[0].ID_DonVi,
                Ten_DonVi: data.results[0].Ten_DonVi,
                MatKhau: password,
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

const getUserLogin = () => ({
    type: types.GET_USER_LOGIN,
});

const getUserLoginSuccess = (user) => ({
    type: types.GET_USER_LOGIN_SUCCESS,
    payload: user
});

const getUserLoginFailure = (err) => ({
    type: types.GET_USER_LOGIN_FAILURE,
    payload: err
});

export const fetchGetUserLogin = () => async dispatch => {
    dispatch(getUserLogin());
    try {
        const user = await AsyncStorage.getItem('UID1234');
        if (!user) {
            return dispatch(getUserLoginFailure('No user credentials found.'));
        }
        const username = JSON.parse(user).TenDangNhap;
        const password = JSON.parse(user).MatKhau;

        const url = `${BASE_URL}/checkLogin?userName=${username}&passWord=${password}`;
        const { data } = await axios.get(url);
        if (data.results && data.results.length > 0) {
            var userObj = {
                isLoggedIn: true,
                ID_NhanSu: data.results[0].ID_NhanSu,
                TenDangNhap: data.results[0].TenDangNhap,
                Ten_BoPhan: data.results[0].Ten_BoPhan,
                ID_DonVi: data.results[0].ID_DonVi,
                Ten_DonVi: data.results[0].Ten_DonVi,
                MatKhau: password,
                data: data.results
            };
            dispatch(getUserLoginSuccess(userObj));
        } else {
            dispatch(getUserLoginFailure('Wrong username or password.'));
        }
    } catch (err) {
        dispatch(getUserLoginFailure('Cannot connect to server. Try again later.'));
    }
}