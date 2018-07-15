import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../themes';
import LoHangThongSoCell from './LoHangThongSoCell';
import { moderateScale } from '../themes/metrics';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: Metrics.doubleBaseMargin,
        marginVertical: Metrics.baseMargin
    },
    defaultRowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridHeaderText: {
        fontFamily: Fonts.type.regular,
        fontSize: moderateScale(Fonts.size.subTitle2),
        textAlign: 'center',
        color: Colors.error
    },
    gridText: {
        fontFamily: Fonts.type.regular,
        fontSize: moderateScale(Fonts.size.subTitle2),
        textAlign: 'center'
    }
});

const { gridHeaderText, gridText, defaultRowContainer } = styles;


const LoHangThongSo = ({ soLuong_RaChuyen, raChuyen_NgayHienTai, soLuongCuaLo, soLuong_KH }) => {
    return (
        <View style={styles.container}>
            <View style={[defaultRowContainer, { borderBottomWidth: 1, borderBottomColor: Colors.steel }]}>
                <LoHangThongSoCell textStyle={gridHeaderText} />
                <LoHangThongSoCell text="T/H" textStyle={gridHeaderText} />
                <LoHangThongSoCell text="K/H" textStyle={gridHeaderText} />
                <LoHangThongSoCell text="%" textStyle={gridHeaderText} />
            </View>

            <View style={[defaultRowContainer, { borderBottomWidth: 1, borderBottomColor: Colors.steel }]}>
                <LoHangThongSoCell text="LT" textStyle={gridHeaderText} />
                <LoHangThongSoCell text={soLuong_RaChuyen} textStyle={gridText} />
                <LoHangThongSoCell text={soLuongCuaLo} textStyle={gridText} />
                <LoHangThongSoCell
                    text={(soLuongCuaLo == null || soLuongCuaLo == 0) ? 0 : ((parseInt(soLuong_RaChuyen) / parseInt(soLuongCuaLo)) * 100).toFixed(0)}
                    textStyle={gridText}
                />
            </View>

            <View style={defaultRowContainer}>
                <LoHangThongSoCell text="TN" textStyle={gridHeaderText} />
                <LoHangThongSoCell text={raChuyen_NgayHienTai} textStyle={gridText} />
                <LoHangThongSoCell text={soLuong_KH} textStyle={gridText} />
                <LoHangThongSoCell
                    text={(soLuong_KH == null || soLuong_KH == 0) ? 0 : ((parseInt(raChuyen_NgayHienTai) / parseInt(soLuong_KH)) * 100).toFixed(0)}
                    textStyle={gridText}
                />
            </View>
        </View>
    )
}

export default LoHangThongSo;