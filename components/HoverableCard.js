import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity, Platform } from 'react-native';
import { useHover } from 'react-native-web-hooks'; 

const HoverableCard = ({ title, description, icon, onPress }) => {
  const [scale] = useState(new Animated.Value(1)); 
  const [opacity] = useState(new Animated.Value(1));  
  const [showDescription, setShowDescription] = useState(false); 

  const ref = React.useRef(null); 
  const isHovered = useHover(ref); 

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.1,  
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,  
      useNativeDriver: true,
    }).start();
    onPress();  
  };

 
  React.useEffect(() => {
    if (isHovered) {
      setShowDescription(true);
      Animated.timing(opacity, {
        toValue: 0.2,  
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      setShowDescription(false);
      Animated.timing(opacity, {
        toValue: 1,  
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isHovered]);

  return (
    <TouchableOpacity
      ref={Platform.OS === 'web' ? ref : null} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={styles.cardContainer}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Animated.View style={[styles.iconWrapper, { opacity }]}>
          <Image source={icon} style={styles.icon} />
        </Animated.View>
        {showDescription ? (
          <Text style={styles.description}>{description}</Text>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
  },
  card: {
    width: 200,
    height: 200,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8243EE',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
  },
});

export default HoverableCard;
