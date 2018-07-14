import { AsyncStorage } from 'react-native';
import { createWhitelistFilter, createBlacklistFilter } from 'redux-persist-transform-filter';
const REDUX_PERSIST = {
    active: true,
    reducerVersion: '1.2',
    storeConfig: {
        key: 'root',
        storage: AsyncStorage,
        transform: [
            createBlacklistFilter('auth', ['fetching', 'error']),
            createBlacklistFilter('garco10', ['fetching', 'error']),
            createBlacklistFilter('network', ['isConnected', 'syncing'])
        ]
    }
}

export default REDUX_PERSIST;