import React, { PureComponent, Component } from 'react';
import { Icon, Text } from 'react-native-elements';
import { Animated, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Colors, Metrics, Fonts } from '../themes';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
    button: {
        borderRadius: Math.round(Metrics.screenWidth) / 10,
        width: Metrics.screenWidth / 5,
        height: Metrics.screenWidth / 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4
    },
    buttonTitle: {
        ...Fonts.style.h6,
        fontFamily: Fonts.type.bold,
        color: Colors.snow
    },
});

class AnimatedRoundButtonWithIcon extends PureComponent {

    ref = null;
    handleRef = ref => {
        this.ref = ref;
    };

    handlePress = () => {
        if (this.ref && this.props.onPress) {
            this.props.onPress(this.ref, this.props.animationType);
        }
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <Animatable.View
                    ref={this.handleRef}
                    style={[{ backgroundColor: this.props.color }, styles.button]}
                >
                    <Icon
                        type='ionicon'
                        name={this.props.iconName}
                        color={Colors.snow}
                        containerStyle={{ marginHorizontal: 5 }}
                    />
                    <Text style={styles.buttonTitle}>{this.props.title}</Text>
                </Animatable.View>
            </TouchableWithoutFeedback>
        );
    }
};

export default AnimatedRoundButtonWithIcon;