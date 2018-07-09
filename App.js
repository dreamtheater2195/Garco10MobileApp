import React from 'react';
import { Provider } from 'react-redux';
import createStore from './store/index';
import Main from './components/Main';

const store = createStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}