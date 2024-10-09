// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';

export default function ProfileSetup({ onNext }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../assets/Inter/static/Inter_24pt-Bold.ttf'),
    'Inter-Medium': require('../assets/Inter/static/Inter_28pt-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const validateForm = () => {
    const isValidAge = /^\d+$/.test(age);
    return name && profileImage && isValidAge && gender;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      // Post to the JSON server
      try {
        const response = await fetch('http://localhost:3000/profiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, age, gender, profileImage }),
        });
        
        if (response.ok) {
          onNext(); // Move to next screen
        } else {
          Alert.alert('Error', 'Failed to save profile. Please try again.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to connect to the server.');
      }
    } else {
      Alert.alert('Validation Error', 'Please fill all fields with valid data.');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Setup</Text>

      <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imagePlaceholder}>Upload Profile Picture</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        keyboardType="numeric"
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />

      <TouchableOpacity
        style={[styles.button, validateForm() ? styles.buttonActive : styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!validateForm()}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#8243EE',
    marginBottom: 20,
  },
  imageUpload: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    color: '#999',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonActive: {
    backgroundColor: '#8243EE',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
