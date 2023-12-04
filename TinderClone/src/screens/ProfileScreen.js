import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Pressable, TextInput} from 'react-native';
import users from '../../assets/data/users';
import { signOut } from 'aws-amplify/auth';
import { Picker } from '@react-native-picker/picker';   


const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const [gender, setGender] = useState();
    const [lookingFor, setLookingFor] = useState();

    const save = () => {

    };

  return (
    <SafeAreaView style={styles.root}>
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                placeholder="Name..."
                value={name}
                onChangeText={setName}
            />

            
            <TextInput
                style={styles.input}
                placeholder="bio..."
                multiline
                numberOfLines={3}
                value={bio}
                onChangeText={setBio}
            />

            <Picker
                label='Gender'
                selectedValue={gender}
                onValueChange={itemValue => setGender(itemValue)}
            >
                <Picker.Item label="Male" value="MALE" />
                <Picker.Item label="Female" value="FEMALE" />
                <Picker.Item label="Other" value="OTHER" />
            </Picker>

            <Picker
                label='Looking for'
                selectedValue={lookingFor}
                onValueChange={itemValue => setLookingFor(itemValue)}
            >
                <Picker.Item label="Male" value="MALE" />
                <Picker.Item label="Female" value="FEMALE" />
                <Picker.Item label="Other" value="OTHER" />
            </Picker>

            <Pressable onPress={save} style={styles.button}>
                <Text>Save</Text>
            </Pressable>

            <Pressable onPress={() => signOut()} style={styles.button}>
                <Text>Sign out</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  container: {
    padding: 10,
  },
  input: {
    margin: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: '#F63A6E',
    height: 25,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});

export default ProfileScreen;