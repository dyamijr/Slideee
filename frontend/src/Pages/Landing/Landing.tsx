import { View, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import landingStyle from './LandingStyle'
import React from 'react';

export default function Landing({ navigation }: { navigation: any }) {
  return (
    <View style={landingStyle.container}>
      <Text style = {landingStyle.slideformat} >Welcome to Slideee</Text>
      <Text></Text>

      <Image 
      style = {landingStyle.logoImage}
      source={require('../../../assets/slide.png')} />
      
      <Text></Text>
      <Text style = {landingStyle.welcomeformat} >Playground of Life</Text>
      
      <Text></Text>
      <Text></Text>
      <Button textColor = '#000000' style = {landingStyle.button} mode="outlined" onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
      
      <Button textColor = '#000000' style = {landingStyle.button} mode="outlined" onPress={() => navigation.navigate('Signup')}>
        SignUp
      </Button>
    </View>
  );
}

