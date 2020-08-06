import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import teachBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';

function Teach(){
  const { goBack }= useNavigation();

  function handleNavigateBack() {
    goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        resizeMode="contain"
        source={teachBgImage} 
        style={styles.content}
      >
        <Text style={styles.title}>Do you want to be a Proffy?</Text>
        <Text style={styles.description}>
          To start you need to sign up as a teacher on our web platform.
        </Text>

        <RectButton onPress={handleNavigateBack} style={styles.okButton}>
          <Text style={styles.okButtonText}>Ok</Text>
        </RectButton>

      </ImageBackground>
    </View>
  )

}

export default Teach;