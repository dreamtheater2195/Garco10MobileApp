import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';

import Input from './Input';

import usernameImg from '../../images/username.png';
import passwordImg from '../../images/password.png';
import eyeImg from '../../images/eye_black.png';

class LoginForm extends Component {
    state = {
        secureTextEntry: true
    }
    toggleShowPassword = () => {
        this.setState({ secureTextEntry: !secureTextEntry });
    }
    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='padding'>
                    <Input source={usernameImg}
                        placeholder='Username'
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        textParent={this.props.usernameText}
                        updateTextParent={this.props.updateUsernameText} />
                    <View style={{ flex: 1 }}>
                        <Input source={passwordImg}
                            secureTextEntry={this.state.secureTextEntry}
                            placeholder='Password'
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            textParent={this.props.passwordText}
                            updateTextParent={this.props.updatePasswordText} />
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.btnEye}
                            onPress={this.toggleShowPassword}
                        >
                            <Image source={eyeImg} style={styles.iconEye} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default LoginForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    btnEye: {
        position: 'absolute',
        top: 10,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
});
