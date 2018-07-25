import { AsyncStorage } from 'react-native';
const REDUX_PERSIST = {
    active: true,
    reducerVersion: '1.6',
    storeConfig: {
        key: 'root',
        storage: AsyncStorage,
        blacklist: ['rehydrated']
    }
}

export default REDUX_PERSIST;