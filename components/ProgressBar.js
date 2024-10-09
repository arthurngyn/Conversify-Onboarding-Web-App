import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProgressBar({ step, totalSteps, onBack }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover effect
  const progress = (step / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={onBack}
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsHovered(false)} // Set hover state to false
        >
          <View style={[styles.backButtonContainer, isHovered && styles.backButtonHover]}>
            <Text style={styles.backButton}>{'< Back'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.progressLabel}>Progress</Text>
      <Text style={styles.progressText}>{`${progress.toFixed(0)}%`}</Text>
      <View style={styles.barContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.stepText}>{`Step ${step} of ${totalSteps}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '60%',
    alignItems: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
  },
  backButtonContainer: {
    borderRadius: 20, // Rounded corners
    paddingVertical: 5, // Vertical padding
    paddingHorizontal: 10, // Horizontal padding
  },
  backButtonHover: {
    backgroundColor: 'lightgray', // Background color on hover
  },
  backButton: {
    color: '#8243EE',
    fontSize: 16,
  },
  progressLabel: {
    color: '#333',
    fontSize: 16,
    marginBottom: 5,
  },
  barContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#8243EE',
  },
  progressText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 'auto',
    marginTop: -25,
  },
  stepText: {
    marginTop: 5,
    color: '#333',
    textAlign: 'center',
  },
});
