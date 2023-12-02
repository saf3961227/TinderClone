import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Pressable, useWindowDimensions, Image } from 'react-native';
import Card from './src/components/TinderCard';
import users from './assets/data/users';
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
import Like from './assets/images/LIKE.png';
import Nope from './assets/images/nope.png';

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentProfile = users[currentIndex];
  const nextProfile = users[nextIndex];

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
    },  
  });

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex, translateX]);

  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.pageContainer}>
      {nextProfile && ( 
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            <Card user={nextProfile}/>
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
              <Card user={currentProfile}/>
            </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  </GestureHandlerRootView>  
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default App;