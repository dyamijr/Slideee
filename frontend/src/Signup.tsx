import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import Input from './components/Input';
import { REACT_APP_BACKEND_URL } from '@env';

export default function Signup({
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');

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
      } else {
        setPassword('');
      }
    } catch (err) {
      console.log(err);
    }
  }, [username, displayName, password]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={(newValue) => setUsername(newValue)}
      />
      <Input
        placeholder="Display Name"
        value={displayName}
        onChangeText={(newValue) => setDisplayName(newValue)}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={(newValue) => setPassword(newValue)}
        secureTextEntry={true}
      />
      <Button title="Signup" onPress={onSignup} />
      <Button
        title="Already have an account?"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
