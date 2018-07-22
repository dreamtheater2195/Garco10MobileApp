import { API_BASE_URL } from '../constants/api';
import axios from 'axios';

export function requestUpdateItemQuantity(currentRaChuyen) {
    const url = `${API_BASE_URL}/LoSanXuats`;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const requestConfig = {
        method: 'put',
        url: url,
        timeout: 2000,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: currentRaChuyen,
        cancelToken: source.token
    };
    const timer = setTimeout(() => {
        source.cancel();
    }, 3000);

    return axios(requestConfig).then(response => {
        clearTimeout(timer);
        return response.data;
    }).catch(err => { throw err });
}

export function requestFetchData(ID_LoSanXuat, ID_DonVi) {
    const url = `${API_BASE_URL}/LoSanXuats?ID_LoSanXuat=${ID_LoSanXuat}&ID_DonVi=${ID_DonVi}`;
    return axios.get(url).then(response => response.data).catch(err => { throw err });
}

export function requestLogin(username, password) {
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
