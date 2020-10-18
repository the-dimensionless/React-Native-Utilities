import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet, LayoutAnimation, UIManager, Dimensions, Alert } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const USE_NATIVE_DRIVER = true;
const { height } = Dimensions.get("window");

const safeHeight = height * 0.2;

const SimpleDragNDrop = () => {

    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        LayoutAnimation.spring();
    });

    let dragItem = React.createRef();
    let [color, setColor] = useState('#32cd32');
    let translateX = new Animated.Value(150);
    let translateY = new Animated.Value(150);
    let lastOffset = { x: 150, y: 150 };

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
                Alert.alert('In Activated Area');
            } else {
                Alert.alert('In Safe Area');
            }
        }
    }

    let panStyle = {
        transform: [
            { translateX }, { translateY },
        ]
    }

    const isTargetArea = (positionX, positionY) => {
        if (positionY < 0) {
            return true;
        }
        return false;
    }

    return (<>
        <View style={{ flex: 1, width: '100%' }}>
            <View style={[styles.topContainer, { backgroundColor: color }]}>
                <Text style={{ fontSize: 23 }}> Drag to Activate!</Text>
            </View>
            <View>
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
        </View>
    </>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        height: 120,
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