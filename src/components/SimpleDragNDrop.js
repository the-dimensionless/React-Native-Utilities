import React from 'react';
import { View, Text, Animated, PanResponder, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const USE_NATIVE_DRIVER = true;
const { height } = Dimensions.get("window");

const safeHeight = height

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
            console.log('Current X', translateX);
            console.log('Current Y', translateY);
        }
    }

    let panStyle = {
        transform: [
            { translateX }, { translateY },
        ]
    }

    const isTargetArea = (positionX, positionY) => {

    }

    return (<>
        <View style={styles.topContainer}>
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
        backgroundColor: '#32cd32',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
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