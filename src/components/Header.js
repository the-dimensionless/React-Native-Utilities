import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Header = forwardRef((props, ref) => {
    useImperativeHandle(
        ref,
        () => ({
            showAlert(code) {
                setColor(code);
            }
        }),
    )
    const [color, setColor] = useState('#32cd32');

    useEffect(() => {
        console.log('Header Updating');
    }, [color]);

    return (
        <View style={[styles.topContainer, { backgroundColor: color }]}>
            <Text style={{ fontSize: 23 }}> Drag to Activate!</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    topContainer: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
})
export default Header;