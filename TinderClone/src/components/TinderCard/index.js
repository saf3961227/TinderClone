import React from 'react';
import { Image, Text, ImageBackground, View, StyleSheet } from 'react-native';

const Card = (props) => {
    const { name, image, bio } = props.user;
    return(     
    <View style={styles.card}>
        <ImageBackground
        source={{
            uri: image,
        }}
        style={styles.image}>
            <View style={styles.cardInner}> 
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.bio}>{bio}</Text>
            </View>
        </ImageBackground>
    </View>
    );
};

const styles = StyleSheet.create({
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

export default Card;