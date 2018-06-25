import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import initialState from './initialState';
import logger from 'redux-logger';

export default store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(thunk, logger)
    )
);