import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut, fetchDataLoHang, changeConnectionState, syncQueueData } from '../actions';
import { View, StyleSheet, ScrollView, Dimensions, ToastAndroid, NetInfo, RefreshControl } from 'react-native';
import { Icon, Button, Overlay, Text, Card } from 'react-native-elements';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import LoHangInfo from '../components/LoHangInfo';
import AnimatedStatusBar from '../components/AnimatedStatusBar';
import { Colors, Fonts, Metrics } from '../themes';
import * as Animatable from 'react-native-animatable';

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
    },
    overlayButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    overlayButton: {
        marginBottom: 10
    },

});
const { defaultRowContainer, defaultColumnContainer, overlayButton, overlayButtonContainer } = styles;

class LoHangScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logingOut: false
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Lô sản xuất',
            headerRight: (
                <Icon
                    reverse
                    name='ios-log-out'
                    type='ionicon'
                    color={Colors.darkPink}
                    size={28}
                    onPress={navigation.getParam('logOutUser')} />
            )
        }
    }

    componentDidMount() {
        NetInfo.isConnected.fetch().then(this.handleConnectionChange);
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

        this.props.navigation.setParams({
            logOutUser: this.logOutUser
        });
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        this.props.changeConnectionState(isConnected);
        if (isConnected) {
            this.fetchData();
        }
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.user) {
            this.props.navigation.navigate('Auth');
        }
    }

    fetchData = () => {
        this.props.syncQueueData().then((done) => {
            if (done) {
                this.props.fetchDataLoHang(0, this.props.auth.user.ID_DonVi).then(() => {
                    console.log('done fetching new data');
                }).catch(err => {
                    ToastAndroid.showWithGravity(
                        'Không thể lấy danh sách lô sản xuất mới nhất',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );
                });
            }
        }).catch((err) => {
            console.log('syncQueueData error', err);
            ToastAndroid.showWithGravity(
                'Không thể đồng bộ dữ liệu với máy chủ',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );
        });
    }

    logOutUser = () => {
        this.setState({ logingOut: true });
    }

    logOutConfirm = () => {
        this.props.logOut();
    }

    logOutCancel = () => {
        this.setState({ logingOut: false });
    }

    renderLoHang = () => {
        const { garco10 } = this.props;
        if (garco10.lohang.length > 0) {
            return garco10.lohang.map((item, index) => {
                return (
                    <LoHangInfo lohang={item} key={index}>
                        <Button
                            icon={<Icon name="ios-create-outline" type="ionicon" color={Colors.snow} />}
                            title="Cập nhật ra chuyền"
                            buttonStyle={{ backgroundColor: Colors.darkPink }}
                            titleStyle={{ fontFamily: Fonts.type.medium, color: Colors.snow }}
                            onPress={() => this.props.navigation.navigate('LoHangUpdate', { lohangIndex: index })}
                        />
                    </LoHangInfo>
                );
            });
        }
    }

    renderNetworkStatusBar = () => {
        const { isConnected } = this.props;
        return (
            <AnimatedStatusBar
                animation={isConnected ? "slideOutUp" : "slideInDown"}
                duration={2000}
                backgroundColor={isConnected ? Colors.green : Colors.bloodOrange}
                position={'top'}
            >
                {(!isConnected) && <ActivityIndicator
                    color={Colors.snow}
                    style={{ marginRight: 5 }}
                />}
                <Text style={{
                    ...Fonts.style.body2,
                    textAlign: 'center'
                }}>
                    {isConnected ? "Đã kết nối vào mạng" : "Không có kết nối mạng"}
                </Text>
            </AnimatedStatusBar>
        );
    }
    renderSyncingStatusBar = () => {
        const { syncing } = this.props;
        return (
            <AnimatedStatusBar
                animation={syncing ? "slideInDown" : "slideOutUp"}
                duration={2000}
                backgroundColor={syncing ? Colors.bloodOrange : Colors.green}
                position={'top'}
            >
                {(syncing) && <ActivityIndicator
                    color={Colors.snow}
                    style={{ marginRight: 5 }}
                />}
                <Text style={{
                    ...Fonts.style.body2,
                    textAlign: 'center'
                }}>
                    Đang đồng bộ dữ liệu
                </Text>
            </AnimatedStatusBar>
        );
    }

    render() {
        const dateString = moment().format('DD/MM/YYYY');
        if (this.props.garco10.fetching) {
            return (
                <View>
                    <Spinner
                        visible={this.props.garco10.fetching}
                        textContent={"Loading..."}
                        textStyle={{ fontFamily: Fonts.type.medium, color: Colors.drawer }}
                        animation="fade"
                    />
                </View>
            )
        }
        if (this.props.garco10.lohang.length === 0) {
            return (
                <ScrollView
                    contentContainerStyle={defaultColumnContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.garco10.fetching}
                            onRefresh={this.fetchData}
                            colors={[Colors.ember]}
                            tintColor="white"
                            title="loading..."
                            titleColor="white"
                            progressBackgroundColor="white"
                        />
                    }
                >
                    <Text style={Fonts.style.body1}>
                        Không có lô sản xuất
                    </Text>
                </ScrollView>
            );
        }
        if (this.state.logingOut) {
            return (
                <View style={defaultColumnContainer}>
                    <Overlay
                        isVisible={this.state.logingOut}
                        onBackdropPress={this.logOutCancel}
                        overlayStyle={{
                            height: Metrics.screenHeight / 3
                        }}
                    >
                        <View style={[defaultColumnContainer, { flex: 2 }]}>
                            <Text style={{ fontFamily: 'roboto-medium' }}>
                                Bạn có chắc muốn đăng xuất?
                            </Text>
                        </View>

                        <View style={[overlayButtonContainer]}>
                            <Button
                                title="Có"
                                onPress={this.logOutConfirm}
                                buttonStyle={[overlayButton, { backgroundColor: Colors.darkPink }]}
                                titleStyle={{ fontFamily: Fonts.type.medium, color: 'white', marginHorizontal: 20 }}
                            />
                            <Button
                                title="Không"
                                onPress={this.logOutCancel}
                                buttonStyle={[overlayButton, { backgroundColor: 'white', borderColor: Colors.darkPink, borderWidth: 1 }]}
                                titleStyle={{ fontFamily: Fonts.type.medium, color: Colors.darkPink }}
                            />
                        </View>
                    </Overlay>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                {this.renderNetworkStatusBar()}
                {this.renderSyncingStatusBar()}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.garco10.fetching}
                            onRefresh={this.fetchData}
                            colors={[Colors.ember]}
                            tintColor="white"
                            title="loading..."
                            titleColor="white"
                            progressBackgroundColor="white"
                        />
                    }
                >
                    {this.renderLoHang()}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    garco10: state.garco10,
    auth: state.auth,
    isConnected: state.network.isConnected
});
export default connect(
    mapStateToProps,
    {
        logOut,
        fetchDataLoHang,
        changeConnectionState,
        syncQueueData
    }
)(LoHangScreen);

