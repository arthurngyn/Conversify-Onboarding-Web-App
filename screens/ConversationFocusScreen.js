import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const options = [
  { id: 1, name: 'Dating', image: require('../assets/dating.png'), description: 'Learn how to navigate dating conversations.' },
  { id: 2, name: 'Sales', image: require('../assets/sales.png'), description: 'Practice sales pitch conversations.' },
  { id: 3, name: 'Negotiation', image: require('../assets/negotiation.png'), description: 'Hone your negotiation skills.' },
  { id: 4, name: 'Small Talk', image: require('../assets/small_talk.png'), description: 'Master casual small talk.' },
  { id: 5, name: 'Interviews', image: require('../assets/interviews.png'), description: 'Prepare for job interviews.' },
  { id: 6, name: 'Pitching', image: require('../assets/pitching.png'), description: 'Pitch your ideas with confidence.' },
];

const ConversationFocusScreen = ({ onNext }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null);

  const toggleOption = (id) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter(optionId => optionId !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const isSelected = (id) => selectedOptions.includes(id);

  const handleConfirm = async () => {
    const selectedTitles = selectedOptions.map(optionId => {
      const option = options.find(opt => opt.id === optionId);
      return option ? option.name : null;
    }).filter(title => title !== null);

    // Send selected options and their titles to JSON server
    try {
      await fetch('http://localhost:3000/conversationFocus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedOptions: selectedTitles }),
      });
      onNext(); // Proceed to the next step
    } catch (error) {
      console.error('Failed to save conversation focus:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What conversations do you want to practice?</Text>

      <View style={styles.grid}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.card, isSelected(option.id) && styles.selectedCard]}
            onPress={() => toggleOption(option.id)}
            onMouseEnter={() => setHoveredOption(option.id)}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <View style={styles.iconContainer}>
              <Image source={option.image} style={styles.icon} />
              <Text style={styles.optionText}>{option.name}</Text>

              
              {hoveredOption === option.id && (
                <View style={styles.hoverDescription}>
                  <Text style={styles.descriptionText}>{option.description}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.confirmButton, selectedOptions.length > 0 ? styles.confirmButtonActive : styles.confirmButtonDisabled]}
        onPress={handleConfirm} // Call handleConfirm to send data and navigate
        disabled={selectedOptions.length === 0}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
  },
  selectedCard: {
    backgroundColor: 'rgba(130, 67, 238, 0.4)', // Transparent purple on selection
  },
  iconContainer: {
    width: '100%', // Ensures the overlay matches the card size
    height: '100%', // Ensures the overlay matches the card size
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0, // Remove padding to ensure overlay fits perfectly
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  hoverDescription: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly less transparent
    borderRadius: 10, // Match the card's border radius
    zIndex: 1, // Ensure it appears on top
  },
  descriptionText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    padding: 10, 
  },
  confirmButton: {
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmButtonActive: {
    backgroundColor: '#8243EE',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConversationFocusScreen;
