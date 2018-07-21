import Reactotron from 'reactotron-react-native';
import Config from '../config/debugConfig';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (Config.useReactotron) {
    Reactotron
        .configure({ name: 'M10 App' })
        .useReactNative()
        .use(reactotronRedux())
        .use(sagaPlugin())
        .connect()

    Reactotron.clear();

    console.tron = Reactotron;
}