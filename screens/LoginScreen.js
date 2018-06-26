import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    Text,
    Dimensions
} from 'react-native';
import wallpaper from '../images/wallpaper.png';
import Logo from '../components/login/Logo';
import LoginForm from '../components/login/LoginForm';
import spinner from '../images/loading.gif';
import { fetchCheckLogin, updatePasswordInputText, updateUsernameInputText } from '../actions';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

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
            <ImageBackground style={styles.container} source={wallpaper}>

                <Logo />
                <LoginForm
                    usernameText={userName}
                    passwordText={passWord}
                    updateUsernameText={this.props.updateUsernameInputText}
                    updatePasswordText={this.props.updatePasswordInputText}
                />
                {!!error &&
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                }
                <View style={styles.buttonContainer}>
                    <Button
                        title="Log in"
                        loading={fetching}
                        loadingProps={{ size: "large", color: "#fff" }}
                        buttonStyle={styles.button}
                        onPress={this.onButtonPress}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSubmit: {
        justifyContent: 'center',
        padding: 10,
        flexDirection: 'row',
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    buttonContainer: {
        flex: 4,
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        marginLeft: MARGIN / 2,
        marginRight: MARGIN / 2
    },
    button: {
        backgroundColor: '#F035E0',
        height: MARGIN,
        borderRadius: 20
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image: {
        width: 24,
        height: 24,
    },
    errorContainer: {
        flex: 1,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    errorText: {
        color: 'red',
        backgroundColor: 'transparent',
    },
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