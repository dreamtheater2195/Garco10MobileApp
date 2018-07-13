import { AsyncStorage } from 'react-native';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
const REDUX_PERSIST = {
    active: true,
    reducerVersion: '1.0',
    storeConfig: {
        key: 'root',
        storage: AsyncStorage,
        transform: [
            createWhitelistFilter('auth', ['user', 'userName', 'passWord']),
            createWhitelistFilter('garco10', ['lohang']),
            createWhitelistFilter('network', ['actionQueue'])
        ]
    }
}

export default REDUX_PERSIST;