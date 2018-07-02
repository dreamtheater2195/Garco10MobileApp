import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/user_actions';
import { fetchDataLoHang } from '../actions/garco10_actions';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Icon, Button, Overlay, Text, Card } from 'react-native-elements';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import { Col, Row, Grid } from "react-native-easy-grid";
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
    headerTitle: {
        fontFamily: 'roboto-medium',
        fontSize: 18,
        color: '#fff',
        marginLeft: 10
    },
    gridHeaderText: {
        fontFamily: 'roboto-medium',
        textAlign: 'center'
    },
    gridText: {
        fontFamily: 'roboto-regular',
        textAlign: 'center'
    },
    cardRowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderColor: '#ccc',
        paddingTop: 5,
        paddingBottom: 5
    },
    cardRowLabel: {
        fontFamily: 'roboto-medium',
    },
    cardDateText: {
        fontFamily: 'roboto-light',
        fontStyle: 'italic',
        color: '#434343'
    },
    cardRowText: {
        fontFamily: 'roboto-regular'
    }
});
const { defaultRowContainer, defaultColumnContainer, overlayButton, overlayButtonContainer, headerTitle, gridHeaderText, gridText, cardRowContainer, cardRowLabel, cardDateText, cardRowText } = styles;

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class LoHangScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logingOut: false
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <Text style={headerTitle}>Lô sản xuất</Text>,
            headerRight: (
                <Icon
                    reverse
                    name='ios-log-out'
                    type='ionicon'
                    color='#5D1049'
                    size={28}
                    onPress={navigation.getParam('logOutUser')} />
            ),
            headerStyle: {
                backgroundColor: '#5D1049'
            }
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            logOutUser: this.logOutUser
        });
        this.props.fetchDataLoHang(0, this.props.auth.user.ID_DonVi);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.user) {
            this.props.navigation.navigate('Auth');
        }
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
        return garco10.lohang.map((item, index) => {
            return (
                <Card title={item.Ma_LoSanXuat} key={index}>

                    <View style={cardRowContainer}>
                        <Text style={cardRowLabel}>Khách hàng: </Text>
                        <Text style={[cardRowText, { color: '#E30425' }]}>{item.Ten_KhachHang}</Text>
                    </View>

                    <View style={cardRowContainer}>
                        <Text style={cardRowLabel}>Style: </Text>
                        <Text style={cardRowText}>{item.StyleName}</Text>
                    </View>

                    <View style={cardRowContainer}>
                        <Text style={cardRowLabel}>Số PO: </Text>
                        <Text style={cardRowText}>{item.PO_No}</Text>
                    </View>

                    <View style={cardRowContainer}>
                        <Text style={cardRowLabel}>Chuyền may: </Text>
                        <Text style={cardRowText}>{item.Ten_ChuyenMay}</Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', paddingTop: 5 }}>
                        <Text style={cardDateText}>
                            Ngày bắt đầu:
                            {' '}
                            {moment(item.Ngay_BatDau).format('DD/MM/YYYY')}
                        </Text>
                        <Text style={cardDateText}>
                            Ngày kết thúc:
                            {' '}
                            {moment(item.Ngay_KetThuc).format('DD/MM/YYYY')}
                        </Text>
                    </View>
                    <Grid style={{ marginTop: 5, marginBottom: 10, borderWidth: 1 }}>
                        <Col>
                            <Row style={{ height: 40, justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}><Text style={gridHeaderText}>Ra chuyền hôm nay</Text></Row>
                            <Row style={{ height: 30, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1 }}><Text style={gridText}>{item.RaChuyen_NgayHienTai}</Text></Row>
                        </Col>

                        <Col>
                            <Row style={{ height: 40, justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}><Text style={gridHeaderText}>SL của lô</Text></Row>
                            <Row style={{ height: 30, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1 }}><Text style={gridText}>{item.SoLuongCuaLo}</Text></Row>
                        </Col>

                        <Col>
                            <Row style={{ height: 40, justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}><Text style={gridHeaderText}>SL kế hoạch</Text></Row>
                            <Row style={{ height: 30, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1 }}><Text style={gridText}>{item.SoLuong_KH}</Text></Row>
                        </Col>

                        <Col>
                            <Row style={{ height: 40, justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}><Text style={gridHeaderText}>SL ra chuyền</Text></Row>
                            <Row style={{ height: 30, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1 }}><Text style={gridText}>{item.SoLuong_RaChuyen}</Text></Row>
                        </Col>

                        <Col>
                            <Row style={{ height: 40, justifyContent: 'center', borderBottomWidth: 1 }}><Text style={gridHeaderText}>SL vào chuyền</Text></Row>
                            <Row style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}><Text style={gridText}>{item.SoLuong_VaoChuyen}</Text></Row>
                        </Col>
                    </Grid>
                    <Button
                        icon={<Icon name="ios-create-outline" type="ionicon" color="#fff" />}
                        title="Cập nhật ra chuyền"
                        buttonStyle={{ backgroundColor: '#720D5D' }}
                        titleStyle={{ fontFamily: 'roboto-medium', color: 'white', fontWeight: '400' }}
                    />
                </Card>
            );
        });
    }
    render() {
        const dateString = moment().format('DD/MM/YYYY');
        if (this.props.garco10.fetching) {
            return (
                <View>
                    <Spinner
                        visible={this.props.garco10.fetching}
                        textContent={"Loading..."}
                        textStyle={{ fontFamily: 'roboto-medium', color: '#253145' }}
                        animation="fade"
                    />
                </View>
            )
        }

        if (this.props.garco10.error) {
            return (
                <View style={defaultColumnContainer}>
                    <Text style={{ fontFamily: 'roboto-medium', fontSize: 18 }}>
                        {this.props.garco10.error}
                    </Text>
                </View>
            )
        }

        if (this.state.logingOut) {
            return (
                <View style={defaultColumnContainer}>
                    <Overlay
                        isVisible={this.state.logingOut}
                        onBackdropPress={this.logOutCancel}
                        overlayStyle={{
                            height: SCREEN_HEIGHT / 3
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
                                buttonStyle={[overlayButton, { backgroundColor: '#720D5D' }]}
                                titleStyle={{ fontFamily: 'roboto-medium', color: 'white', marginHorizontal: 20 }}
                            />
                            <Button
                                title="Không"
                                onPress={this.logOutCancel}
                                buttonStyle={[overlayButton, { backgroundColor: 'white', borderColor: '#720D5D', borderWidth: 1 }]}
                                titleStyle={{ fontFamily: 'roboto-medium', color: '#720D5D' }}
                            />
                        </View>
                    </Overlay>
                </View>
            )
        }
        return (
            <ScrollView>
                {this.renderLoHang()}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    garco10: state.garco10,
    auth: state.auth
});
export default connect(
    mapStateToProps,
    {
        logOut,
        fetchDataLoHang
    }
)(LoHangScreen);

