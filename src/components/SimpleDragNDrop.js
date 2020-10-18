import React, { useState } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const USE_NATIVE_DRIVER = true;
const { height } = Dimensions.get("window");

const safeHeight = height * 0.2;

const SimpleDragNDrop = () => {

    let dragItem = React.createRef();
    const [color, setColor] = useState('#32cd32');

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

            console.log();
            if (isTargetArea(lastOffset.x, lastOffset.y)) {
                setColor('red');
            } else {
                setColor('#32cd32');
            }
        }
    }

    let panStyle = {
        transform: [
            { translateX }, { translateY },
        ]
    }

    const isTargetArea = (positionX, positionY) => {
        // console.log('danger zone ', safeHeight);
        if (positionY < 0) {
            // console.log('IN ACTIVATION AREA!!!');
            return true;
        }
        return false;
    }

    return (<>
        <View style={[styles.topContainer, { backgroundColor: color }]}>
            <Text style={{ fontSize: 23 }}> Drag to Activate!</Text>
        </View>
        <View style={{ flex: 0.8 }}>
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
                        Item!
                                </Text>
                </Animated.View>
            </PanGestureHandler>
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 0.2,
        // backgroundColor: '#32cd32',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
        height: 100,
        width: 100,
        borderRadius: 50
    },
    text: {
        fontSize: 23
    }
})

export default SimpleDragNDrop;