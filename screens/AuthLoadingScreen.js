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

    componentWillMount() {
        this.props.fetchGetUserLogin();
    }

    componentWillReceiveProps(nextProps) {
        const isLoggedIn = nextProps.currentUser.isLoggedIn;
        this.props.navigation.navigate(isLoggedIn ? 'App' : 'Auth');
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
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

const mapStateToProps = ({ currentUser }) => ({
    currentUser
});

export default connect(mapStateToProps, { fetchGetUserLogin })(AuthLoadingScreen);