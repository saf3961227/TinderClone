import React from 'react';
import { Text, View, StyleSheet, Pressable, useWindowDimensions, Image } from 'react-native';
import Card from './src/components/TinderCard';
import users from './assets/data/users';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AnimatedStack from './src/components/AnimatedStack';


const App = () => {

  const onSwipeLeft = (user) => {
    console.log('swiped left', user.name);
  };
  const onSwipeRight = (user) => {
    console.log('swiped right', user.name);
  };

  return (
    <View style={styles.pageContainer}>
      <AnimatedStack
        data={users}
        renderItem = {(({ item }) => <Card user={item} />)}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;