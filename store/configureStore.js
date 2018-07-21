import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Config from '../config/debugConfig';
import ReduxPersist from '../config/reduxPersist';
import Rehydration from '../services/rehydration';
import createSagaMiddleware from 'redux-saga';
import * as sagas from '../sagas';

export default (rootReducer, rootSaga) => {
    const middleware = [];
    const enhancers = [];
    /* ------------- Saga Middleware ------------- */
    const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null;
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    middleware.push(sagaMiddleware);

    /* ------------- Thunk middleware ------------ */
    middleware.push(thunk);

    /* ------------- Logger Middleware ----------- */
    if (Config.reduxLogging) {
        middleware.push(logger);
    }

    /* ------------ Assemble Middlewares --------- */
    enhancers.push(applyMiddleware(...middleware));

    const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore;
    const store = createAppropriateStore(rootReducer, compose(...enhancers));

    if (ReduxPersist.active) {
        Rehydration.updateReducers(store);
    }

    let sagasManager = sagaMiddleware.run(rootSaga);

    return { store, sagasManager, sagaMiddleware };
}