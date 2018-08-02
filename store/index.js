import reducers from '../reducers';
import ReduxPersist from '../config/reduxPersist';
import { persistReducer } from 'redux-persist';
import configureStore from './configureStore';
import rootSaga from '../sagas';

export default () => {
    let finalReducers = reducers;

    if (ReduxPersist.active) {
        const persistConfig = ReduxPersist.storeConfig;
        finalReducers = persistReducer(persistConfig, reducers);
    }

    let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga);

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers/index').default;

            store.replaceReducer(
                ReduxPersist.active
                    ? persistReducer(ReduxPersist.storeConfig, nextRootReducer)
                    : nextRootReducer
            );

            const newYeildedSagas = require('../sagas').default;
            sagasManager.cancel();
            sagasManager.done.then(() => {
                sagasManager = sagaMiddleware.run(newYeildedSagas);
            })
        });
    }

    return store;
}