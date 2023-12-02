import React from 'react';
import { Text, View, StyleSheet, Pressable, useWindowDimensions, Image } from 'react-native';
import Card from '../components/TinderCard';
import users from '../../assets/data/users';

import AnimatedStack from '../components/AnimatedStack';


const HomeScreen = () => {

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
    width: '100%',
  }
});

export default HomeScreen;