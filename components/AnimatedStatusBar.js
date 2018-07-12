import React, { PureComponent, Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { Colors, Metrics, Fonts } from '../themes';
import { Animated, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const styles = StyleSheet.create({
    container: {
        elevation: 2,
        position: 'absolute',
        left: 0,
        right: 0,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

const AnimatedStatusBar = ({ animation, duration, backgroundColor, position, children }) => {
    return (
        <Animatable.View
            animation={animation}
            duration={duration}
            style={[styles.container,
            { backgroundColor: backgroundColor },
            position === 'top' && { top: 0 },
            position === 'bottom' && { bottom: 0 }]}
        >
            {children}
        </Animatable.View>
    )
}

export default AnimatedStatusBar;