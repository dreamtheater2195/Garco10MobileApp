import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, ActivityIndicator, AsyncStorage, ScrollView, RefreshControl, TouchableOpacity, Picker, PickerIOS, Platform, InteractionManager, ToastAndroid } from 'react-native';
import { Icon, Button, Overlay, Text, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import LoHangInfo from '../components/LoHangInfo';
import { Colors, Metrics } from '../themes';
import { updateSLRaChuyen } from '../actions';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        borderRadius: Math.round(Metrics.screenWidth) / 10,
        width: Metrics.screenWidth / 5,
        height: Metrics.screenWidth / 5
    },
    buttonPlus: {
        backgroundColor: Colors.facebook
    },
    buttonMinus: {
        backgroundColor: Colors.bloodOrange
    },
    buttonTitle: {
        fontSize: 20
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

    updateSoLuongRaChuyen = (num) => {
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

    render() {
        const { lohang } = this.props;
        return (
            <LoHangInfo lohang={lohang}>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonRow}>
                        <Button
                            icon={<Icon type='ionicon' name='ios-add' color={Colors.snow} />}
                            title="1"
                            buttonStyle={[styles.button, styles.buttonPlus]}
                            titleStyle={styles.buttonTitle}
                            onPress={() => this.updateSoLuongRaChuyen(1)}
                        />
                        <Button
                            icon={<Icon type='ionicon' name='ios-remove' color={Colors.snow} />}
                            title="1"
                            buttonStyle={[styles.button, styles.buttonMinus]}
                            titleStyle={styles.buttonTitle}
                            onPress={() => this.updateSoLuongRaChuyen(-1)}
                        />
                    </View>
                    <View style={styles.buttonRow}>
                        <Button
                            icon={<Icon type='ionicon' name='ios-add' color={Colors.snow} />}
                            title="10"
                            buttonStyle={[styles.button, styles.buttonPlus]}
                            titleStyle={styles.buttonTitle}
                            onPress={() => this.updateSoLuongRaChuyen(10)}
                        />
                        <Button
                            icon={<Icon type='ionicon' name='ios-remove' color={Colors.snow} />}
                            title="10"
                            buttonStyle={[styles.button, styles.buttonMinus]}
                            titleStyle={styles.buttonTitle}
                            onPress={() => this.updateSoLuongRaChuyen(-10)}
                        />
                    </View>
                </View>
            </LoHangInfo>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const index = ownProps.navigation.getParam('lohangIndex');
    const lohang = state.garco10.lohang[index];
    return {
        lohang,
        currentUser: state.auth.user,
        isConnected: state.network.isConnected
    }
}

export default connect(
    mapStateToProps,
    { updateSLRaChuyen }
)(LoHangUpdateScreen);