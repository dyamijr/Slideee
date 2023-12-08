import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, TextInput } from 'react-native-paper';
import signupStyle from './SignupStyle';
import styles from '../../styles/main'

export default function Signup({
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [displayNameError,setDisplayNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onSignup = useCallback(async () => {
    try {
      let response = await fetch(`${REACT_APP_BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          displayName: displayName,
          password: password,
        }),
      });
      if (response.ok) {
        navigation.navigate('Home');
      } 
      
      else{
        const err = await response.json();
        throw new Error(err.message || err.statusText);
        setUsernameError(err.message);
        setPassword('');
      }
    } catch (err) {
      console.error(`${err}.`)
    }
  }, [username, displayName, password]);

  return (
    <View style={styles.container}>
      <Image 
      style = {signupStyle.logoImage}
      source={require('../../../assets/slide.png')} />
      <Text style={signupStyle.mottoformat}>Slideee</Text>

      <TextInput
        style = {signupStyle.boxstyle1}
        placeholderTextColor= 'black'
        underlineColor='black'
        activeUnderlineColor='black'
        activeOutlineColor='black'
        placeholder="Username"
        value={username}
        onChangeText={(newValue) => setUsername(newValue)}
      />
      
      <TextInput
        style = {signupStyle.boxstyle1}
        placeholderTextColor= 'black'
        underlineColor='black'
        activeUnderlineColor='black'
        activeOutlineColor='black'
        placeholder="Display Name"
        value={displayName}
        onChangeText={(newValue) => setDisplayName(newValue)}
      />
      
      <TextInput
        style = {signupStyle.boxstyle1}
        placeholderTextColor= 'black'
        underlineColor='black'
        activeUnderlineColor='black'
        activeOutlineColor='black'
        placeholder="Password"
        value={password}
        onChangeText={(newValue) => setPassword(newValue)}
        secureTextEntry={true}
      />
      
      <Button textColor='#000000' style = {signupStyle.button} mode="outlined" onPress={onSignup}>
        SignUp
      </Button>
      <Button
        textColor='#000000' style = {signupStyle.button} mode="outlined" onPress={() => navigation.navigate('Login')}
      >
        Already have an account?
      </Button>
    </View>
  );
}

