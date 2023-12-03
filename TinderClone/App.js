import React, {useState} from 'react';
import { View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

const App = () => {
  const [activeScreen, setActiveScreen] = useState('HOME');

  const color = '#b5b5b5';
  const activeColor = '#F63A6E';
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.pageContainer}>
        <View style={styles.topNavigation}>
          <Pressable onPress={()=> setActiveScreen('HOME')}>
            <Fontisto name="tinder" size={30} color={activeScreen == 'HOME' ? activeColor: color} />
          </Pressable>
          <MaterialCommunityIcons name="star-four-points" size={30} color={color} />
          <Pressable onPress={()=> setActiveScreen('CHAT')}>
            <Ionicons name="ios-chatbubbles" size={30}  color={activeScreen == 'CHAT' ? activeColor: color}  />
          </Pressable>
          <FontAwesome name="user" size={30} color={color} />
        </View>
        {activeScreen == 'HOME' && <HomeScreen/>}
        {activeScreen == 'CHAT' && <MatchesScreen/>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topNavigation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 30,
  },
});

export default App;