import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MainAppExperience() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main App Experience</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontFamily: 'Inter-Bold', 
  },
});
