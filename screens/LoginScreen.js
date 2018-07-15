import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    View,
    Text,
    Image
} from 'react-native';
import LoginForm from '../components/LoginForm';
import { fetchCheckLogin, updatePasswordInputText, updateUsernameInputText } from '../actions';
import { connect } from 'react-redux';
import { Images, Metrics, Fonts } from '../themes';

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
                <ImageBackground style={styles.bgImage} source={Images.background}>
                    <View style={styles.loginView}>
                        <View style={styles.loginTitle}>
                            <Image source={Images.whiteLogo} style={styles.whiteLogo} resizeMode="contain" />
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
        width: Metrics.screenWidth,
        height: Metrics.screenHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginView: {
        backgroundColor: 'transparent',
        width: Metrics.screenWidth / 2,
        height: Metrics.screenHeight / 2,
        marginBottom: Metrics.doubleBaseMargin
    },
    loginTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    loginTitleText: {
        color: 'white',
        ...Fonts.style.h4
    },
    whiteLogo: {
        flex: 1
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