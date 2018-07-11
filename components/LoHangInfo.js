import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import moment from 'moment';
import { Colors, Fonts, Metrics } from '../themes';

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
    gridHeaderText: {
        fontFamily: Fonts.type.medium,
        textAlign: 'center'
    },
    gridText: {
        fontFamily: Fonts.type.regular,
        textAlign: 'center'
    },
    cardRowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderColor: Colors.steel,
        paddingTop: 5,
        paddingBottom: 5
    },
    cardRowLabel: {
        fontFamily: Fonts.type.medium,
    },
    cardDateContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 5
    },
    cardDateText: {
        fontFamily: Fonts.type.light,
        fontStyle: 'italic',
        color: Colors.coal
    },
    cardRowText: {
        fontFamily: Fonts.type.regular
    }
});

const { gridHeaderText, gridText, cardRowContainer, cardRowLabel, cardDateContainer, cardDateText, cardRowText } = styles;


const LoHangInfo = ({ lohang, children }) => {
    return (
        <Card title={lohang.Ma_LoSanXuat} wrapperStyle={{ flex: 1 }} containerStyle={{ flex: 1, marginBottom: 10, zIndex: 1 }}>
            <View style={cardRowContainer}>
                <Text style={cardRowLabel}>Khách hàng: </Text>
                <Text style={[cardRowText, { color: Colors.error }]}>{lohang.Ten_KhachHang}</Text>
            </View>

            <View style={cardRowContainer}>
                <Text style={cardRowLabel}>Style: </Text>
                <Text style={cardRowText}>{lohang.StyleName}</Text>
            </View>

            <View style={cardRowContainer}>
                <Text style={cardRowLabel}>Số PO: </Text>
                <Text style={cardRowText}>{lohang.PO_No}</Text>
            </View>

            <View style={cardRowContainer}>
                <Text style={cardRowLabel}>Chuyền may: </Text>
                <Text style={cardRowText}>{lohang.Ten_ChuyenMay}</Text>
            </View>

            <View style={cardDateContainer}>
                <Text style={cardDateText}>
                    Ngày bắt đầu:
                            {' '}
                    {moment(lohang.Ngay_BatDau).format('DD/MM/YYYY')}
                </Text>
                <Text style={cardDateText}>
                    Ngày kết thúc:
                            {' '}
                    {moment(lohang.Ngay_KetThuc).format('DD/MM/YYYY')}
                </Text>
            </View>
            <Grid style={{ flex: 1, marginTop: 5, marginBottom: 20 }}>
                <Col>
                    <Row style={{ height: 40, justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}>
                        <Text style={gridHeaderText}>Ra chuyền hôm nay</Text>
                    </Row>
                    <Row style={{ height: 30, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1 }}>
                        <Text style={gridText}>{lohang.RaChuyen_NgayHienTai}</Text>
                    </Row>
                </Col>

                <Col>
                    <Row style={{ height: 40, justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}>
                        <Text style={gridHeaderText}>SL của lô</Text>
                    </Row>
                    <Row style={{ height: 30, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1 }}>
                        <Text style={gridText}>{lohang.SoLuongCuaLo}</Text>
                    </Row>
                </Col>

                <Col>
                    <Row style={{ height: 40, justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}>
                        <Text style={gridHeaderText}>SL kế hoạch</Text>
                    </Row>
                    <Row style={{ height: 30, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1 }}>
                        <Text style={gridText}>{lohang.SoLuong_KH}</Text>
                    </Row>
                </Col>

                <Col>
                    <Row style={{ height: 40, justifyContent: 'center', borderBottomWidth: 1, borderRightWidth: 1 }}>
                        <Text style={gridHeaderText}>SL ra chuyền</Text>
                    </Row>
                    <Row style={{ height: 30, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1 }}>
                        <Text style={gridText}>{lohang.SoLuong_RaChuyen}</Text>
                    </Row>
                </Col>

                <Col>
                    <Row style={{ height: 40, justifyContent: 'center', borderBottomWidth: 1 }}>
                        <Text style={gridHeaderText}>SL vào chuyền</Text>
                    </Row>
                    <Row style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={gridText}>{lohang.SoLuong_VaoChuyen}</Text>
                    </Row>
                </Col>
            </Grid>
            {children}
        </Card>
    );
};

export default LoHangInfo;