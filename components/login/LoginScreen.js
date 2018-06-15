import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    TouchableOpacity,
    Animated,
    Text,
    Image,
    Easing,
    Dimensions
} from 'react-native';
import wallpaper from '../../images/wallpaper.png';
import Logo from './Logo';
import LoginForm from './LoginForm';
import spinner from '../../images/loading.gif';


const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false
        }
        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
    }

    updateUsernameText = (username) => {
        this.setState({ username });
    }
    updatePasswordText = (password) => {
        this.setState({ password });
    }

    onButtonPress = () => {
        if (this.state.isLoading) return;

        this.setState({ isLoading: true });

        Animated.timing(
            this.buttonAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();

        setTimeout(() => {
            this.onGrow();
        }, 2000);

        setTimeout(() => {
            this.setState({ isLoading: false });
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
        }, 2300);

        //login
    }

    onGrow = () => {
        Animated.timing(
            this.growAnimated,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.linear
            }
        ).start();
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN]
        });

        return (
            <ImageBackground style={{ flex: 1 }} source={wallpaper}>
                <Logo />
                <LoginForm
                    usernameText={this.state.username}
                    passwordText={this.state.password}
                    updateUsernameText={this.updateUsernameText}
                    updatePasswordText={this.updatePasswordText}
                />
                {/* <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{""}</Text>
                </View> */}
                <View style={styles.buttonContainer}>
                    <Animated.View style={{ width: changeWidth }}>
                        <TouchableOpacity style={styles.button}
                            onPress={this.onButtonPress}
                            activeOpacity={1} >
                            {this.state.loading ?
                                <Image source={spinner} style={styles.image} />
                                :
                                <Text style={styles.text}>Login</Text>
                            }
                        </TouchableOpacity>
                        <Animated.View style={[styles.circle, { transform: [{ scale: changeScale }] }]} />
                    </Animated.View>
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
        backgroundColor: '#F5FCFF',
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
        flex: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F035E0',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#F035E0',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#F035E0',
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
        top: -30,
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

export default LoginScreen;