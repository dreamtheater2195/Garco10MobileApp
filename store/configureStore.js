import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Config from '../config/debugConfig';
import ReduxPersist from '../config/reduxPersist';
import Rehydration from '../services/rehydration';
export default (rootReducer) => {
    const middleware = [thunk];
    const enhancers = [];
    if (Config.reduxLogging) {
        middleware.push(logger);
    }
    enhancers.push(applyMiddleware(...middleware))
    const store = createStore(rootReducer, compose(...enhancers));

    if (ReduxPersist.active) {
        Rehydration.updateReducers(store);
    }

    return { store };
}