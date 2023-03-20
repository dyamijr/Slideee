import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import Input from './components/Input';
import { REACT_APP_BACKEND_URL } from '@env';

export default function Login({ navigation }: { route: any; navigation: any }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = useCallback(async () => {
    try {
      console.log('HERE');
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
      console.log(response);
      if (response.ok) {
        navigation.navigate('Home');
      } else {
        setPassword('');
      }
    } catch (err) {
      console.log(err);
    }
  }, [username, password]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={(newValue) => setUsername(newValue)}
      />
      <Input
        placeholder="Password"
        onChangeText={(newValue) => setPassword(newValue)}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={onLogin} />
      <Button
        title="Don't have an account?"
        onPress={() => navigation.navigate('Signup')}
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
