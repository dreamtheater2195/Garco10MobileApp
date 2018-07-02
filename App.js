import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main';
import { Font, AppLoading } from 'expo';

export default class App extends React.Component {
  state = {
    fontLoaded: false
  }
  async componentDidMount() {
    await Font.loadAsync({
      'raleway-light': require('./assets/fonts/Raleway-Light-vi.ttf'),
      'raleway-regular': require('./assets/fonts/Raleway-Regular-vi.ttf'),
      'raleway-medium': require('./assets/fonts/Raleway-Medium-vi.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
      'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}