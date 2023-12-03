import React from 'react';
import { Text, View, StyleSheet, Pressable, useWindowDimensions, Image } from 'react-native';
import Card from '../components/TinderCard';
import users from '../../assets/data/users';
import { FontAwesome, Entypo } from '@expo/vector-icons';
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
      <View style={styles.icons}>
        <View style={styles.button}>
            <FontAwesome name="undo" size={30} color="#FBD88B" />
        </View>
        <View style={styles.button}>
            <Entypo name="cross" size={30} color="#F76C6B" />
        </View>
        <View style={styles.button}>
            <FontAwesome name="star" size={30} color="#3AB4CC" />
        </View>
        <View style={styles.button}>
            <FontAwesome name="heart" size={30} color="#4FCC94" />
        </View>
        <View style={styles.button}>
            <FontAwesome name="flash" size={30} color="#A65CD2" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'ededed',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',   
    padding: 10,
    borderRadius: 50,
  },
});

export default HomeScreen;