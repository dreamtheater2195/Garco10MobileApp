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
import { Font, AppLoading } from 'expo';
import { Images, Metrics } from '../themes';
import { currentUserSelector } from '../selectors';
class AuthLoadingScreen extends React.Component {

    state = {
        fontLoaded: false
    }

    async componentWillMount() {
        await Font.loadAsync({
            'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
            'roboto-light': require('../assets/fonts/Roboto-Light.ttf'),
            'roboto-medium': require('../assets/fonts/Roboto-Medium.ttf'),
            'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { currentUser, rehydrated } = this.props;
        if (this.state.fontLoaded && rehydrated) {
            this.props.navigation.navigate(currentUser ? 'App' : 'Auth');
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
        )
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

const mapStateToProps = (state) => {
    return {
        currentUser: currentUserSelector(state),
        rehydrated: state.rehydrated
    }
};

export default connect(mapStateToProps, { fetchGetUserLogin })(AuthLoadingScreen);