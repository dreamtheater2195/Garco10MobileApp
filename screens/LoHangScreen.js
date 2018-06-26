import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ScrollView, RefreshControl, Platform } from 'react-native';
import { Icon, Button, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { logOut } from '../actions/user_actions';

class LoHangScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            showReset: false,
            logingOut: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Lô sản xuất",
            headerRight: (
                <Button
                    title="Đăng xuất"
                    onPress={navigation.getParam('onLogOutButtonPress')}
                    titleStyle={{ color: "#0894f5" }}
                    clear
                />
            )
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ onLogOutButtonPress: this.onLogOutButtonPress });
    }

    componentWillReceiveProps(nextProps) {
        console.log('CurrentUser', nextProps.auth.user);
        if (!nextProps.auth.user) {
            this.props.navigation.navigate('Auth');
        }
    }

    onLogOutButtonPress = () => {
        this.setState({ logingOut: true });
    }

    onLogOutConfirm = () => {
        this.props.logOut();
    }

    onLogOutCancel = () => {
        this.setState({ logingOut: false });
    }

    onRefresh = () => {
        this.setState({ refreshing: true });
    }

    showPicker = () => {

    }
    render() {
        return (
            <ScrollView
                scrollEnabled={true}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.defaultColumnContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        title="refreshing..."
                    />
                }
            >

                <Button
                    title="Chọn lô sản xuất"
                    onPress={this.showPicker}
                />

                <Overlay
                    isVisible={this.state.logingOut}
                    onBackdropPress={this.onLogOutCancel}
                >
                    <Text>Bạn có chắc muốn đăng xuất?</Text>
                    <View>
                        <Button title="Có" onPress={this.onLogOutConfirm} />
                        <Button title="Không" onPress={this.onLogOutCancel} />
                    </View>
                </Overlay>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logOut })(LoHangScreen);

const styles = StyleSheet.create({
    defaultRowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    defaultColumnContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})