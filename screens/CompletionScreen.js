import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CompletionScreen({ onStartPracticing }) {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>
          You’re all set! Get ready to master conversations.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onStartPracticing}>
        <Text style={styles.buttonText}>Start Practicing</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  bubble: {
    backgroundColor: '#8243EE', // Purple background
    borderRadius: 20,
    padding: 20,
    marginBottom: 45, 
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
    width: '40%', 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
