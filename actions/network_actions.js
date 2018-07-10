import * as types from './types';

export const changeConnectionState = (isConnected) => {
    return {
        type: types.CHANGE_CONNECTION_STATUS,
        payload: isConnected
    };
};