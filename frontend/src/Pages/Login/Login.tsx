import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Chip, TextInput } from 'react-native-paper';
import loginStyle from './LoginStyle'
import styles from '../../styles/main'

export default function Login({ navigation }: { route: any; navigation: any }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const onLogin = useCallback(async () => {
    try {
      let response = await fetch(`${REACT_APP_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.ok) {
        navigation.navigate('Home');
      } else {
        setPassword('');
      }
    } catch (err) {
      console.error(`Error Logging In: ${err}.`)
    }
  }, [username, password]);

  return (
    
    <View style={loginStyle.container}>
      <Image 
      style = {loginStyle.logoImage}
      source={require('../../../assets/slide.png')} />
      <Text style={loginStyle.mottoformat}>Slideee</Text>

      <TextInput
        style = {loginStyle.boxstyle1}
        placeholderTextColor= 'black'
        underlineColor='black'
        activeUnderlineColor='black'
        activeOutlineColor='black'
        placeholder="Username"
        value={username}
        onChangeText={(newValue) => setUsername(newValue)}
      />
      
      <TextInput
        style = {loginStyle.boxstyle1}
        placeholderTextColor= 'black'
        underlineColor='black'
        activeUnderlineColor='black'
        activeOutlineColor='black'
        placeholder="Password"
        value={password}
        onChangeText={(newValue) => setPassword(newValue)}
        secureTextEntry={true}
      />
      
      
      <Button textColor='#000000' style = {loginStyle.button} mode="outlined" onPress={onLogin}>
        Login
      </Button>

      <Button textColor='#000000' style = {loginStyle.button} mode="outlined" onPress={() => navigation.navigate('Signup')}>
        Don't have an account?
      </Button>
    </View>
  );
}


