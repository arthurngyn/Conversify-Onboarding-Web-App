import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ onNext }) {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>
          Hey there! Welcome to Conversify{"\n"}
          Are you ready to level up your conversation skills in just minutes?
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>Let's go!</Text>
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
  bubble: {
    backgroundColor: '#8243EE', // Purple background
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    width: '80%', 
    alignItems: 'center', 
  },
  bubbleText: {
    color: 'white', 
    fontSize: 18,
    textAlign: 'center', 
  },
  button: {
    backgroundColor: '#6200EE', 
    padding: 15,
    borderRadius: 5,
    width: '20%', 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
