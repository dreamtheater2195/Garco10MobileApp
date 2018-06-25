import { combineReducers } from 'redux';
import currentUser from './currentUser';
export default combineReducers({
    garco10: () => { return {} },
    garco10Ex: () => { return {} },
    currentUser: currentUser
})