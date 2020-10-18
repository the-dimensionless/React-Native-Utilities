import React from 'react';
import { View, Text, StyleSheet, Animation } from 'react-native';

const SimpleDragNDrop = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello I am a text!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 23,
    }
})

export default SimpleDragNDrop;