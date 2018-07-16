import * as types from '../actions/types';
import initialState from '../store/initialState';

const rehydrated = (state = initialState.rehydrated, action) => {
    switch (action.type) {
        case types.REHYDRATION_COMPLETE:
            return true;
        default:
            return state;
    }
}

export default rehydrated;