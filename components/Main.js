import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import LoHangScreen from '../screens/LoHangScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

const AppStack = createStackNavigator({
    App: LoHangScreen
});

const Navigator = createSwitchNavigator({
    Auth: LoginScreen,
    App: AppStack,
    AuthLoading: AuthLoadingScreen
},
    {
        initialRouteName: 'AuthLoading'
    });

class Main extends React.Component {
    render() {
        return (
            <Navigator />
        );
    }
}
export default Main;