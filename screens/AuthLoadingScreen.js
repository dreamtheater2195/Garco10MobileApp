import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
    StyleSheet
} from 'react-native';
import { fetchGetUserLogin } from '../actions';
import { connect } from 'react-redux';
import { Font, AppLoading } from 'expo';

class AuthLoadingScreen extends React.Component {

    state = {
        isLoggedIn: null,
        fontLoaded: false
    }

    async componentDidMount() {
        await Font.loadAsync({
            'raleway-light': require('../assets/fonts/Raleway-Light.ttf'),
            'raleway-regular': require('../assets/fonts/Raleway-Regular.ttf'),
            'raleway-medium': require('../assets/fonts/Raleway-Medium.ttf'),
            'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
            'roboto-light': require('../assets/fonts/Roboto-Light.ttf'),
            'roboto-medium': require('../assets/fonts/Roboto-Medium.ttf'),
            'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
        });
        this.setState({ fontLoaded: true });
        this.props.fetchGetUserLogin();
    }

    componentWillReceiveProps(nextProps) {
        const { user } = nextProps.auth;
        this.props.navigation.navigate(user ? 'App' : 'Auth');
    }

    render() {
        if (!this.state.fontLoaded) {
            return <AppLoading />;
        }
        if (this.state.isLoggedIn === null) {
            return <AppLoading />;
        } else {
            return (
                <View />
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(mapStateToProps, { fetchGetUserLogin })(AuthLoadingScreen);