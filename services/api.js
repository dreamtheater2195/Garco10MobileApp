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