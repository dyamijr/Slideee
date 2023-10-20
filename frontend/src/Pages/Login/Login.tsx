import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
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
    
    <View style={styles.container}>
      <Image 
      style = {styles.logoImage}
      source={require('../../../assets/slide.png')} />
      <TextInput
        style = {styles.inputText}
        underlineColor="transparent"
        placeholder="Username"
        value={username}
        onChangeText={(newValue) => setUsername(newValue)}
      />
      <TextInput
        style = {styles.inputText}
        underlineColor="transparent"
        placeholder="Password"
        onChangeText={(newValue) => setPassword(newValue)}
        value={password}
        secureTextEntry={true}
      />
      <Button style = {styles.button} mode="outlined" onPress={onLogin}>
        Login
      </Button>
      <Button style = {styles.button} mode="outlined" onPress={() => navigation.navigate('Signup')}>
        Don't have an account?
      </Button>
    </View>
  );
}


