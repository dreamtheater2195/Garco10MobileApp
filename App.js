import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store/index';
import Main from './components/Main';
import './config/reactotronConfig';
import DebugConfig from './config/debugConfig';

const store = createStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
