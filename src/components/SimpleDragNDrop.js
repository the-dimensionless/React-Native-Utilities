import React from 'react';
import { View, Text, Animated, PanResponder, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const USE_NATIVE_DRIVER = true;

const SimpleDragNDrop = () => {

    let dragItem = React.createRef();

    let translateX = new Animated.Value(0);
    let translateY = new Animated.Value(0);
    let lastOffset = { x: 0, y: 0 };

    let onPanGestureEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX,
                    translationY: translateY,
                },
            },
        ],
        { useNativeDriver: USE_NATIVE_DRIVER }
    )

    const onPanStateChangeHandler = (evt) => {
        if (evt.nativeEvent.oldState === State.ACTIVE) {
            lastOffset.x += evt.nativeEvent.translationX;
            lastOffset.y += evt.nativeEvent.translationY;
            translateX.setOffset(lastOffset.x);
            translateX.setValue(0);
            translateY.setOffset(lastOffset.y);
            translateY.setValue(0);
        }
    }

    let panStyle = {
        transform: [
            { translateX }, { translateY },
        ]
    }

    return (
        <PanGestureHandler
            onGestureEvent={onPanGestureEvent}
            onHandlerStateChange={onPanStateChangeHandler}
            ref={dragItem}
            shouldCancelWhenOutside={true}
        >
            <Animated.View style={[panStyle, styles.container]}>
                <Text style={[
                    styles.text
                ]}>
                    Hello I am text!
                                </Text>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
        height: 200
    },
    text: {
        fontSize: 23
    }
})

export default SimpleDragNDrop;