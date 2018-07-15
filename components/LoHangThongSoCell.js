import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
    defaultColumnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const { defaultColumnContainer } = styles;

const LoHangThongSoCell = ({ text, textStyle }) => {
    return (
        <View style={defaultColumnContainer}>
            <Text style={textStyle}>{text}</Text>
        </View>
    )
}

export default LoHangThongSoCell;