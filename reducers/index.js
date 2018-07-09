import { combineReducers } from 'redux';
import auth from './auth';
import garco10 from './garco10';

export default combineReducers({
    garco10,
    auth
})