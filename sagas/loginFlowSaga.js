import { take, put, cancel, call, fork } from 'redux-saga/effects';
import * as types from '../actions';
import { checkLoginFailure, checkLoginSuccess } from '../actions';
import * as api from '../services/api';
function* authorize(username, password) {
    try {
        const user = yield call(api.requestLogin, username, password);
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