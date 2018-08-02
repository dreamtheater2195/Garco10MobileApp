import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import LoHangInfo from '../components/LoHangInfo';
import AnimatedRoundButtonWithIcon from '../components/AnimatedRoundButtonWithIcon';
import AnimatedStatusBar from '../components/AnimatedStatusBar';
import { Colors, Metrics, Fonts } from '../themes';
import { updateSLRaChuyen } from '../actions';
import { loHangsSelector, currentUserSelector, isConnectedSelector, syncingSelector } from '../selectors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1.5
    },
    buttonRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    messageBar: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.bloodOrange,
        padding: 5
    }
});
class LoHangUpdateScreen extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Cập nhật ra chuyền'
        }
    }

    handlePress = (componentRef) => {
        componentRef.setNativeProps({
            style: {
                zIndex: 1,
            },
        });
        componentRef.animate('bounce', 1000).then(() => {
            componentRef.setNativeProps({
                style: {
                    zIndex: 0,
                },
            });
        });
    }

    updateSoLuongRaChuyen = (num, componentRef, animationType) => {
        componentRef.setNativeProps({
            style: {
                zIndex: 1,
            },
        });
        componentRef.animate(animationType, 1000).then(() => {
            componentRef.setNativeProps({
                style: {
                    zIndex: 0,
                },
            });
        });

        const { lohang, currentUser } = this.props;

        const soLuongRaChuyen = parseInt(num);
        if (lohang.raChuyen_NgayHienTai <= 0 && soLuongRaChuyen < 0) {
            return ToastAndroid.showWithGravity(
                'Cảnh báo. Ra chuyền hiện tại đang là 0',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
        let slRaChuyen = lohang.raChuyen_NgayHienTai ?
            (lohang.raChuyen_NgayHienTai + soLuongRaChuyen) : soLuongRaChuyen;
        if (slRaChuyen < 0) slRaChuyen = 0;

        let totalRaChuyen = lohang.soLuong_RaChuyen + soLuongRaChuyen;
        if (totalRaChuyen < 0) totalRaChuyen = 0;

        const payload = {
            soLuong_RaChuyen: totalRaChuyen,
            raChuyen_NgayHienTai: slRaChuyen,
            userName: currentUser.userName,
            loSxId: lohang.iD_LoSanXuat,
            mauSpId: 0,
            coSpId: 0,
            soluongRaChuyen: soLuongRaChuyen,
            nguoiNhapId: currentUser.ID_NhanSu,
            createDate: new Date()
        };
        this.props.updateSLRaChuyen(payload);
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
                    textAlign: 'center',
                    color: Colors.snow
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
                    textAlign: 'center',
                    color: Colors.snow
                }}>
                    "Đang đồng bộ dữ liệu"
                </Text>
            </AnimatedStatusBar>
        );
    }

    render() {
        const { lohang } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {this.renderNetworkStatusBar()}
                <LoHangInfo lohang={lohang} containerStyle={{ margin: 0 }}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonRow}>
                            <AnimatedRoundButtonWithIcon
                                onPress={(componentRef, animationType) => this.updateSoLuongRaChuyen(1, componentRef, animationType)}
                                color={Colors.facebook}
                                iconName="ios-add"
                                title="1"
                                animationType="rubberBand"
                            />
                            <AnimatedRoundButtonWithIcon
                                onPress={(componentRef, animationType) => this.updateSoLuongRaChuyen(-1, componentRef, animationType)}
                                color={Colors.bloodOrange}
                                iconName="ios-remove"
                                title="1"
                                animationType="pulse"
                            />
                        </View>
                        <View style={styles.buttonRow}>
                            <AnimatedRoundButtonWithIcon
                                onPress={(componentRef, animationType) => this.updateSoLuongRaChuyen(10, componentRef, animationType)}
                                color={Colors.facebook}
                                iconName="ios-add"
                                title="10"
                                animationType="rubberBand"
                            />
                            <AnimatedRoundButtonWithIcon
                                onPress={(componentRef, animationType) => this.updateSoLuongRaChuyen(-10, componentRef, animationType)}
                                color={Colors.bloodOrange}
                                iconName="ios-remove"
                                title="10"
                                animationType="pulse"
                            />
                        </View>
                    </View>
                </LoHangInfo>
                {/* {this.renderSyncingStatusBar()} */}
            </View >
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const index = ownProps.navigation.getParam('lohangIndex');
    return {
        lohang: loHangsSelector(state)[index],
        currentUser: currentUserSelector(state),
        isConnected: isConnectedSelector(state),
        syncing: syncingSelector(state)
    }
}

export default connect(
    mapStateToProps,
    { updateSLRaChuyen }
)(LoHangUpdateScreen);