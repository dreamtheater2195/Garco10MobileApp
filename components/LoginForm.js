import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
class LoginForm extends Component {

    render() {
        return (
            <React.Fragment>
                <View style={styles.loginInput}>
                    <Input
                        leftIcon={
                            <Icon
                                name='user-o'
                                color='rgba(171, 189, 219, 1)'
                                size={25}
                            />
                        }
                        containerStyle={{ marginVertical: 10 }}
                        onChangeText={this.props.updateUsernameText}
                        value={this.props.usernameText}
                        inputStyle={{ marginLeft: 10, color: 'white' }}
                        keyboardAppearance="light"
                        placeholder="Username"
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        ref={input => this.emailInput = input}
                        onSubmitEditing={() => {
                            this.passwordInput.focus();
                        }}
                        blurOnSubmit={false}
                        placeholderTextColor="white"
                    />
                    <Input
                        leftIcon={
                            <Icon
                                name='lock'
                                color='rgba(171, 189, 219, 1)'
                                size={25}
                            />
                        }
                        containerStyle={{ marginVertical: 10 }}
                        onChangeText={this.props.updatePasswordText}
                        value={this.props.passwordText}
                        inputStyle={{ marginLeft: 10, color: 'white' }}
                        secureTextEntry={true}
                        keyboardAppearance="light"
                        placeholder="Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType="done"
                        ref={input => this.passwordInput = input}
                        blurOnSubmit={true}
                        placeholderTextColor="white"
                        errorStyle={{ textAlign: 'center', fontSize: 14 }}
                        errorMessage={this.props.error ? this.props.error : null}
                    />
                </View>
                <Button
                    title='ĐĂNG NHẬP'
                    activeOpacity={1}
                    underlayColor="transparent"
                    onPress={this.props.onButtonPress}
                    loading={!!this.props.fetching}
                    loadingProps={{ size: 'small', color: 'white' }}
                    disabled={false}
                    buttonStyle={{ height: 50, width: SCREEN_WIDTH / 2, backgroundColor: 'transparent', borderWidth: 2, borderColor: 'white', borderRadius: 30 }}
                    containerStyle={{ marginVertical: 10 }}
                    titleStyle={{ fontFamily: 'roboto-medium', color: 'white', fontWeight: '700' }}
                />
            </React.Fragment>
        );
    }
}

export default LoginForm;

const styles = StyleSheet.create({
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
