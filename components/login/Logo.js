import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import logoImg from '../../images/logo1.png';

const Logo = () => {
    return (
        <View style={styles.container}>
            <Image source={logoImg} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Logo;