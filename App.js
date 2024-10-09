import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ConversationFocusScreen from './screens/ConversationFocusScreen';  
import VoicePreferenceScreen from './screens/VoicePreferenceScreen'; 
import CompletionScreen from './screens/CompletionScreen';
import MainAppExperience from './MainAppExperience'; 
import ProgressBar from './components/ProgressBar';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5; // 5 steps in total for the onboarding flow

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startPracticing = () => {
    setCurrentStep(totalSteps); // Move to the main app experience
  };

  const renderScreen = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeScreen onNext={handleNextStep} />;
      case 1:
        return <ProfileScreen onNext={handleNextStep} onBack={handlePreviousStep} />;
      case 2:
        return <ConversationFocusScreen onNext={handleNextStep} onBack={handlePreviousStep} />;
      case 3:
        return <VoicePreferenceScreen onNext={handleNextStep} />;
      case 4:
        return <CompletionScreen onStartPracticing={startPracticing} />;
      case 5:
        return <MainAppExperience />;
      default:
        return <WelcomeScreen onNext={handleNextStep} />;
    }
  };

  return (
    <View style={styles.container}>
      {currentStep < totalSteps && (
        <ProgressBar step={currentStep + 1} totalSteps={totalSteps} onBack={handlePreviousStep} />
      )}
      {renderScreen()}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
});
