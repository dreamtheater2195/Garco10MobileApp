import * as types from '../actions/types';
import initialState from '../store/initialState';

const network = (state = initialState.network, action) => {
    switch (action.type) {
        case types.CHANGE_CONNECTION_STATUS:
            return {
                ...state,
                isConnected: action.payload
            }
        case types.ADD_ACTION_TO_QUEUE:
            return {
                ...state,
                actionQueue: [...state.actionQueue, action.payload]
            }
        case types.SYNC_DATA_SUCCESS:
            return {
                ...state,
                actionQueue: []
            }
        default:
            return state;
    }
}

export default network;