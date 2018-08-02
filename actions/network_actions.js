import * as types from './types';

export const changeConnectionState = (isConnected) => {
    return {
        type: types.CHANGE_CONNECTION_STATUS,
        payload: isConnected
    };
};

export const syncData = () => {
    return {
        type: types.SYNC_DATA
    }
}

export const syncDataStop = () => {
    return {
        type: types.SYNC_DATA_STOP
    }
}