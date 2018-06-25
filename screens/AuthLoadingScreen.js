import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
    StyleSheet
} from 'react-native';
import { fetchGetUserLogin } from '../actions';
import { connect } from 'react-redux';

class AuthLoadingScreen extends React.Component {

    state = {
        isLoggedIn: null
    }

    componentDidMount() {
        this.props.fetchGetUserLogin();
    }

    componentWillReceiveProps(nextProps) {
        const { user } = nextProps.auth;
        console.log(user);
        this.props.navigation.navigate(user ? 'App' : 'Auth');
    }

    render() {
        if (this.state.isLoggedIn === null) {
            console.log('render indicator');
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                    <StatusBar barStyle="default" />
                </View>
            );
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