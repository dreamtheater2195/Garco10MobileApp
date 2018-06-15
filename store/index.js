import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const initialState = {
    currentUser: {
        userName: 'hoadl',
        passWord: '123456',
        isLogin: false,
        data: [],
        detailLoSx: [],
        errLogin: ''
    },
    garco10: {
        lohang: [],
        dataDisplay: [],
        selectedValue: [],
    },
    garco10Ex: {
        selectedPickerValue: { infoLoSx: {}, loSxId: 0, maloSx: '', pickerValue: '', isShowPicker: false, selectedValue: [] },
    }
};

export default store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(thunk)
    )
);