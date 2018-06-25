import * as types from '../actions/types';
import initialState from '../store/initialState';
const currentUser = (state = initialState.currentUser, action) => {
    switch (action.type) {
        case types.CHECK_LOGIN:
            return {
                ...state,
                fetching: true
            };
        case types.CHECK_LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                isLoggedIn: true,
                ID_NhanSu: action.payload.ID_NhanSu,
                userName: action.payload.TenDangNhap,
                Ten_BoPhan: action.payload.Ten_BoPhan,
                ID_DonVi: action.payload.ID_DonVi,
                Ten_DonVi: action.payload.Ten_DonVi,
                passWord: action.payload.MatKhau,
                data: action.payload.data
            }
        case types.CHECK_LOGIN_FAILURE:
            return {
                ...state,
                error: true,
                errLogin: action.payload,
                fetching: false
            }
        case types.GET_USER_LOGIN:
            return {
                ...state,
                fetching: true
            };
        case types.GET_USER_LOGIN_SUCCESS:
            return {
                ...state,
                fetching: false,
                isLoggedIn: true,
                ID_NhanSu: action.payload.ID_NhanSu,
                userName: action.payload.TenDangNhap,
                Ten_BoPhan: action.payload.Ten_BoPhan,
                ID_DonVi: action.payload.ID_DonVi,
                Ten_DonVi: action.payload.Ten_DonVi,
                passWord: action.payload.MatKhau,
                data: action.payload.data
            };
        case types.GET_USER_LOGIN_FAILURE:
            return {
                ...state,
                error: true,
                errLogin: action.payload,
                fetching: false
            };
        default:
            return state;
    }
}

export default currentUser;