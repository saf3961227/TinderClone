import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './src/components/TinderCard';
import users from './assets/data/users';


const App = () => {
  return (
  <View style={styles.pageContainer}>
    <Card user={users[2]}/>
  </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;