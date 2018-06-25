import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import LoHangScreen from '../screens/LoHangScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import { createSwitchNavigator } from 'react-navigation';

class Main extends React.Component {
    render() {
        const Navigator = createSwitchNavigator({
            Auth: LoginScreen,
            App: LoHangScreen,
            AuthLoading: AuthLoadingScreen
        }, {
                initialRouteName: 'AuthLoading'
            });
        return (
            <Navigator />
        );
    }
}
export default Main;