import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    View,
    Text,
    Image
} from 'react-native';
import wallpaper from '../assets/images/bg_screen1.jpg';
import LoginForm from '../components/LoginForm';
import { fetchCheckLogin, updatePasswordInputText, updateUsernameInputText } from '../actions';
import { connect } from 'react-redux';
import logo from '../assets/images/logo-white.png';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.user) {
            this.props.navigation.navigate('App');
        }
    }

    onButtonPress = () => {
        const { fetching, userName, passWord } = this.props.auth;
        if (fetching) return;

        this.props.fetchCheckLogin(userName, passWord);
    }

    render() {

        const { userName, passWord, error, fetching } = this.props.auth;
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.bgImage} source={wallpaper}>
                    <View style={styles.loginView}>
                        <View style={styles.loginTitle}>
                            <Image source={logo} />
                        </View>
                        <LoginForm
                            usernameText={userName}
                            passwordText={passWord}
                            updateUsernameText={this.props.updateUsernameInputText}
                            updatePasswordText={this.props.updatePasswordInputText}
                            error={error}
                            fetching={fetching}
                            onButtonPress={this.onButtonPress}
                        />
                    </View>
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
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginView: {
        backgroundColor: 'transparent',
        width: SCREEN_WIDTH / 2,
        height: SCREEN_HEIGHT / 2,
    },
    loginTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTitleText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'roboto-bold'
    }
});

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {
        fetchCheckLogin,
        updatePasswordInputText,
        updateUsernameInputText
    }
)(LoginScreen);