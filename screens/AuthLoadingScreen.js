import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
    StyleSheet,
    ImageBackground
} from 'react-native';
import { fetchGetUserLogin } from '../actions';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { Images, Metrics } from '../themes';
class AuthLoadingScreen extends React.Component {

    state = {
        isLoggedIn: null,
        fontLoaded: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rehydrated) {
            Font.loadAsync({
                'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
                'roboto-light': require('../assets/fonts/Roboto-Light.ttf'),
                'roboto-medium': require('../assets/fonts/Roboto-Medium.ttf'),
                'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
            }).then(() => {
                this.props.navigation.navigate(nextProps.auth.user ? 'App' : 'Auth');
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.bgImage} source={Images.background}>
                    <ActivityIndicator size="large" />
                    <StatusBar barStyle="default" />
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = ({ auth, rehydrated }) => ({
    auth,
    rehydrated
});

export default connect(mapStateToProps, { fetchGetUserLogin })(AuthLoadingScreen);