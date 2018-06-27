import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default Confirm = ({ children, visible, onAccept, onDecline }) => {
    const { containerStyle, sectionContainerStyle, textStyle } = styles;
    return (
        <Modal
            animationType="slide"
            onRequestClose={() => { }}
            transparent
            visible={visible}
        >
            <View style={containerStyle}>
                <View style={[sectionContainerStyle, { justifyContent: 'center' }]}>
                    <Text style={textStyle}>
                        {children}
                    </Text>
                </View>

                <View style={sectionContainerStyle}>
                    <Button onPress={onAccept} title="Có" />
                    <Button onPress={onDecline} title="Không" />
                </View>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    sectionContainerStyle: {
        borderWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
})