import React, { Component } from 'react';
import { Animated, View, StyleSheet, ActivityIndicator, AsyncStorage, ScrollView, RefreshControl, TouchableOpacity, Picker, PickerIOS, Platform, InteractionManager, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import { Icon, Button, Overlay, Text, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import LoHangInfo from '../components/LoHangInfo';
import AnimatedRoundButtonWithIcon from '../components/AnimatedRoundButtonWithIcon';
import { Colors, Metrics, Fonts } from '../themes';
import { updateSLRaChuyen } from '../actions';
import * as Animatable from 'react-native-animatable';
import fonts from '../themes/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 6,
        marginTop: 30
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
        if (lohang.RaChuyen_NgayHienTai <= 0 && soLuongRaChuyen < 0) {
            return ToastAndroid.showWithGravity(
                'Cảnh báo. Ra chuyền hiện tại đang là 0',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
        let slRaChuyen = lohang.RaChuyen_NgayHienTai ? lohang.RaChuyen_NgayHienTai + soLuongRaChuyen : soLuongRaChuyen;
        if (slRaChuyen < 0) slRaChuyen = 0;

        let totalRaChuyen = lohang.SoLuong_RaChuyen + soLuongRaChuyen;
        if (totalRaChuyen < 0) totalRaChuyen = 0;

        const payload = {
            SoLuong_RaChuyen: totalRaChuyen,
            RaChuyen_NgayHienTai: slRaChuyen,
            userName: currentUser.userName,
            loSxId: lohang.ID_LoSanXuat,
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
            <Animatable.View
                animation={isConnected ? "slideOutUp" : "slideInDown"}
                duration={2000}
                style={{
                    elevation: 2,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: isConnected ? Colors.green : Colors.bloodOrange,
                    padding: 5,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                {(!isConnected) && <ActivityIndicator
                    color={Colors.snow}
                    style={{ marginRight: 5 }}
                />}
                <Text style={{
                    color: Colors.snow,
                    textAlign: 'center'
                }}>
                    {isConnected ? "Đã kết nối vào mạng" : "Không có kết nối mạng"}
                </Text>
            </Animatable.View>
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
                                onPress={(componentRef, animationType) => this.updateSoLuongRaChuyen(1, componentRef, animationType)}
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
            </View >
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const index = ownProps.navigation.getParam('lohangIndex');
    const lohang = state.garco10.lohang[index];
    return {
        lohang,
        currentUser: state.auth.user,
        isConnected: state.network.isConnected,
        syncing: state.network.syncing
    }
}

export default connect(
    mapStateToProps,
    { updateSLRaChuyen }
)(LoHangUpdateScreen);