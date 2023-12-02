import React, {useEffect, useState} from 'react';
import { View, StyleSheet, useWindowDimensions} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  useDerivedValue,
  useAnimatedGestureHandler,
  interpolate,
  runOnJS,
 } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Like from '../../../assets/images/LIKE.png';
import Nope from '../../../assets/images/nope.png';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

const AnimatedStack = (props) => {

    const { data, renderItem, onSwipeRight, onSwipeLeft } = props;

    const [currentIndex, setCurrentIndex] = useState(0);

    const [nextIndex, setNextIndex] = useState(currentIndex + 1);

    const currentProfile = data[currentIndex];
    const nextProfile = data[nextIndex];

    const { width: screenWidth } = useWindowDimensions();

    const hiddenTranslateX = 2 * screenWidth;

    const translateX = useSharedValue(0);
    const rotate = useDerivedValue(() => interpolate(
        translateX.value,
        [0, hiddenTranslateX], 
        [0, ROTATION], 
        [0, 60]) + 'deg');

    const cardStyle = useAnimatedStyle(() => ({
        transform: [
        {
            translateX: translateX.value,
        },
        {
            rotate: rotate.value,
        },
        ],

    }));

    const nextCardStyle = useAnimatedStyle(() => ({
        transform: [
        {
            scale: interpolate(
            translateX.value,
            [-hiddenTranslateX, 0, hiddenTranslateX], 
            [1, 0.8, 1])}
        ],
        opacity: interpolate(
        translateX.value,
        [-hiddenTranslateX, 0, hiddenTranslateX], 
        [1, 0.6, 1]),

    }));

    const likeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
        translateX.value,
        [0, hiddenTranslateX / 5], 
        [0, 1]),
    }));

    const nopeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
        translateX.value,
        [0, -hiddenTranslateX / 5], 
        [0, 1]),
    }));

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
        context.startX = translateX.value;
        },
        onActive: (event, context) => {
        translateX.value = context.startX + event.translationX;
        },
        onEnd: (event) => {
        if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
            translateX.value = withSpring(0);
            return;
        }

        translateX.value = withSpring(
            hiddenTranslateX * Math.sign(event.velocityX),
            {},
            () => runOnJS(setCurrentIndex)(currentIndex + 1),
        );

        const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft;
        runOnJS(onSwipe)(currentProfile);
        },  
    });

    useEffect(() => {
        translateX.value = 0;
        setNextIndex(currentIndex + 1);
    }, [currentIndex, translateX]);

  return (
  <GestureHandlerRootView style={{ flex: 1, width: '100%'}}>
    <View style={styles.root}>
      {nextProfile && ( 
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            {renderItem({ item: nextProfile })}
          </Animated.View>
        </View>
      )}

      {currentProfile && (
        <PanGestureHandler onGestureEvent={gestureHandler}> 
            <Animated.View style={[styles.animatedCard, cardStyle]}>
              <Animated.Image 
                source={Like} style={[styles.like, {left: 10}, likeStyle]} resizeMode='contain'>
              </Animated.Image>
              <Animated.Image 
                source={Nope} style={[styles.like, {right: 10}, nopeStyle]} resizeMode='contain'>
              </Animated.Image>
                {renderItem({ item: currentProfile })}
            </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  </GestureHandlerRootView>  
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  animatedCard: {
    width: '90%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  like: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    position: 'absolute',
    top: 50,
    zIndex: 1,
  },
});

export default AnimatedStack;