import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
class LoHangScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>LoHang</Text>
            </View>
        );
    }
}

export default LoHangScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})