import Reactotron from 'reactotron-react-native';
import Config from '../config/debugConfig';
import { reactotronRedux } from 'reactotron-redux';

if (Config.useReactotron) {
    Reactotron
        .configure({ name: 'M10 App' })
        .useReactNative()
        .use(reactotronRedux())
        .connect()

    Reactotron.clear();

    console.tron = Reactotron;
}