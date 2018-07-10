import { AsyncStorage } from 'react-native';

const REDUX_PERSIST = {
    active: false,
    reducerVersion: '1.0',
    storeConfig: {
        key: 'root',
        storage: AsyncStorage,
        blacklist: []
    }
}

export default REDUX_PERSIST;