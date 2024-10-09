// VoicePreferenceScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function VoicePreferenceScreen({ onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    
    // Send selected option to JSON server
    try {
      await fetch('http://localhost:3000/voicePreferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedOption: option }),
      });
    } catch (error) {
      console.error('Failed to save voice preference:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Preferred Conversation Mode</Text>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'casual' && styles.selectedOption]}
          onPress={() => handleOptionSelect('casual')}
        >
          <Image source={require('../assets/casual.png')} style={styles.icon} />
          <Text style={styles.label}>Casual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'professional' && styles.selectedOption]}
          onPress={() => handleOptionSelect('professional')}
        >
          <Image source={require('../assets/professional.png')} style={styles.icon} />
          <Text style={styles.label}>Professional</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, selectedOption === 'romantic' && styles.selectedOption]}
          onPress={() => handleOptionSelect('romantic')}
        >
          <Image source={require('../assets/romantic.png')} style={styles.icon} />
          <Text style={styles.label}>Romantic</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.confirmButton, !selectedOption && styles.disabledButton]}
        onPress={onNext}
        disabled={!selectedOption}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
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
    marginTop: -20, 
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Inter-Bold', 
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  option: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 35, 
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: 'rgba(130, 67, 238, 0.4)', // Light purple for selected option
  },
  icon: {
    width: 60, 
    height: 60, 
    marginBottom: 5,
  },
  label: {
    fontSize: 16, 
    fontFamily: 'Inter-Medium', 
  },
  confirmButton: {
    backgroundColor: '#6200EE', // Purple background
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#ccc', // Gray out the button when disabled
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Inter-Bold', 
  },
});
