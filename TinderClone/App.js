import React from 'react';
import { Image, Text, ImageBackground, View, StyleSheet } from 'react-native';
const App = () => {
  return (
  <View style={styles.pageContainer}>
    <View style={styles.card}>
      <ImageBackground
        source={{
          uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
        }}
        style={styles.image}>
          <View style={styles.cardInner}> 
            <Text style={styles.name}>Elon Musk</Text>
            <Text style={styles.bio}>A dude with a rocket is looking for a gal with fuel</Text>
          </View>
      </ImageBackground>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '95%',
    height: '70%',
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 6.68,
    shadowOpacity: 0.36,
    elevation: 11,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',

    justifyContent: 'flex-end',
  },
  cardInner: {
    padding: 10,
  },
  name: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  bio: {
    color: 'white',
    fontSize: 18,
    lineHeight: 25,
  },
});

export default App;