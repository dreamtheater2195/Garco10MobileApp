import reducers from '../reducers';
import ReduxPersist from '../config/reduxPersist';
import { persistReducer } from 'redux-persist';
import configureStore from './configureStore';
export default () => {
    let finalReducers = reducers;

    if (ReduxPersist.active) {
        const persistConfig = ReduxPersist.storeConfig;
        finalReducers = persistReducer(persistConfig, reducers);
    }

    let { store } = configureStore(finalReducers);

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers/index').default;

            store.replaceReducer(
                ReduxPersist.active
                    ? persistReducer(ReduxPersist.storeConfig, nextRootReducer)
                    : nextRootReducer
            );
        });
    }

    return store;
}