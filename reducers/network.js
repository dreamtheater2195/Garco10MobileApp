import * as types from '../actions/types';
import initialState from '../store/initialState';

const network = (state = initialState.network, action) => {
    switch (action.type) {
        case types.CHANGE_CONNECTION_STATUS:
            return {
                ...state,
                isConnected: action.payload
            }
        default:
            return state;
    }
}

export default network;