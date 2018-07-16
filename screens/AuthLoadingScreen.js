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
        Font.loadAsync({
            'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
            'roboto-light': require('../assets/fonts/Roboto-Light.ttf'),
            'roboto-medium': require('../assets/fonts/Roboto-Medium.ttf'),
            'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
        }).then(() => {
            const { auth, rehydrated } = this.props;
            if (rehydrated) {
                this.props.navigation.navigate(auth.user ? 'App' : 'Auth');
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = ({ auth, rehydrated }) => ({
    auth,
    rehydrated
});

export default connect(mapStateToProps, { fetchGetUserLogin })(AuthLoadingScreen);