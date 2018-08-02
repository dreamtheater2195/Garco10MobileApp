import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Icon } from 'react-native-elements';
import moment from 'moment';
import { Colors, Fonts, Metrics } from '../themes';
import LoHangThongSo from './LoHangThongSo';
import { moderateScale } from '../themes/metrics';
const styles = StyleSheet.create({
    cardRowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderColor: Colors.steel,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    cardRowLabel: {
        fontFamily: Fonts.type.medium,
        fontSize: moderateScale(Fonts.size.subTitle2)
    },
    cardDateContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 5
    },
    cardDateText: {
        fontFamily: Fonts.type.light,
        fontSize: moderateScale(Fonts.size.subTitle2),
        fontStyle: 'italic',
        color: Colors.coal
    },
    cardRowText: {
        fontFamily: Fonts.type.regular,
        fontSize: moderateScale(Fonts.size.subTitle2)
    }
});

const { cardRowContainer, cardRowLabel, cardDateContainer, cardDateText, cardRowText } = styles;

export class LoHangInfo extends PureComponent {
    render() {
        const { lohang, children, wrapperStyle, containerStyle } = this.props;
        return (
            <Card title={lohang.ma_LoSanXuat} wrapperStyle={[{ flex: 1 }, wrapperStyle]} containerStyle={[{ flex: 1 }, containerStyle]}>
                <View style={{ flex: 1 }}>
                    <View style={cardRowContainer}>
                        <Text style={cardRowLabel}>Khách hàng: </Text>
                        <Text style={[cardRowText]}>{lohang.ten_KhachHang}</Text>
                    </View>

                    <View style={cardRowContainer}>
                        <Text style={cardRowLabel}>Style: </Text>
                        <Text style={cardRowText}>{lohang.styleName}</Text>
                    </View>

                    <View style={cardRowContainer}>
                        <Text style={cardRowLabel}>Số PO: </Text>
                        <Text style={cardRowText}>{lohang.pO_No}</Text>
                    </View>

                    <View style={cardRowContainer}>
                        <Text style={cardRowLabel}>Chuyền may: </Text>
                        <Text style={cardRowText}>{lohang.ten_ChuyenMay}</Text>
                    </View>

                    <View style={cardDateContainer}>
                        <Text style={cardDateText}>
                            Bắt đầu:
                            {' '}
                            {moment(lohang.ngay_BatDau).format('DD/MM/YYYY')}
                        </Text>
                        <Text style={cardDateText}>
                            Kết thúc:
                            {' '}
                            {moment(lohang.ngay_KetThuc).format('DD/MM/YYYY')}
                        </Text>
                    </View>
                </View>
                <LoHangThongSo {...lohang} />
                {children}
            </Card>
        );
    };
}

export default LoHangInfo;