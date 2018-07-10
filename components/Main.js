import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import LoHangUpdateScreen from '../screens/LoHangUpdateScreen';
import LoHangScreen from '../screens/LoHangScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { Colors } from '../themes';

const AppStack = createStackNavigator({
    LoHang: LoHangScreen,
    LoHangUpdate: LoHangUpdateScreen
}, {
        initialRouteName: 'LoHang',
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: Colors.darkPink
            },
            headerTitleStyle: {
                fontFamily: 'roboto-medium',
                fontSize: 18,
                color: Colors.snow,
                marginLeft: 10
            },
            headerTintColor: Colors.snow
        }
    });

const Navigator = createSwitchNavigator({
    Auth: LoginScreen,
    App: AppStack,
    AuthLoading: AuthLoadingScreen
},
    {
        initialRouteName: 'AuthLoading'
    });

export default class Main extends React.Component {

    render() {
        return (
            <Navigator />
        );
    }
}