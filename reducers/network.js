import * as types from '../actions/types';
import initialState from '../store/initialState';
import _ from 'lodash';
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
                syncing: false,
                actionQueue: [...state.actionQueue, action.payload]
            }
        case types.SYNC_DATA:
            return {
                ...state,
                syncing: true
            }
        case types.SYNC_DATA_STOP:
            return {
                ...state,
                syncing: false
            }
        case types.REMOVE_ACTION_FROM_QUEUE:
            return {
                ...state,
                actionQueue: _.without(state.actionQueue, action.payload)
            }
        case types.REHYDRATION_COMPLETE:
            return {
                ...state,
                syncing: false,
                isConnected: false,
            }
        default:
            return state;
    }
}

export default network;