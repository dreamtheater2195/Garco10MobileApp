import { combineReducers } from 'redux';
import auth from './auth';
import garco10 from './garco10';
import network from './network';
import rehydrated from './rehydrated';
export default combineReducers({
    garco10,
    auth,
    network,
    rehydrated
})