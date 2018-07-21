import { take, put, cancel, call, fork } from 'redux-saga/effects';
import * as types from '../actions';
import { checkLoginFailure, checkLoginSuccess } from '../actions';
import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

function* authorize(username, password) {
    try {
        const user = yield call(requestLogin, username, password);
        if (user) {
            yield put(checkLoginSuccess(user));
        } else {
            yield put(checkLoginFailure('Sai tên đăng nhập hoặc mật khẩu'));
        }
    } catch (error) {
        yield put(checkLoginFailure('Không thể kết nối với máy chủ. Thử lại sau'));
    }
}
export default function* loginFlow() {
    while (true) {
        const { payload } = yield take(types.CHECK_LOGIN);
        const task = yield fork(authorize, payload.username, payload.password);
        const action = yield take([types.LOG_OUT, types.CHECK_LOGIN_FAILURE]);
        if (action.type === types.LOG_OUT) {
            yield cancel(task);
        }
    }
}

const requestLogin = (username, password) => {
    const url = `${API_BASE_URL}/Authenticate`;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const timer = setTimeout(() => {
        source.cancel();
    }, 7000);

    const payload = {
        tenDangNhap: username,
        matKhau: password
    };

    const config = {
        timeout: 5000,
        cancelToken: source.token
    };
    return axios.post(url, payload, config).then(response => {
        const { data } = response;
        if (!data) return null;

        clearTimeout(timer);
        const user = {
            ID_NhanSu: data.iD_NhanSu,
            TenDangNhap: data.tenDangNhap,
            MatKhau: password,
            Ten_BoPhan: data.ten_BoPhan,
            ID_DonVi: data.iD_DonVi,
            Ten_DonVi: data.ten_DonVi
        }
        return user;
    }).catch(err => {
        throw err;
    });
}