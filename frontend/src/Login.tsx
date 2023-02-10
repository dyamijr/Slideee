import React, {useCallback, useState} from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = useCallback(async () => {
    try {
      let response = await fetch("http://localhost:3000/auth/login", {
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
      let json = response.json();
      console.log(json);
    } catch(err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        onChangeText={(value) => setUsername(value)}
        value={username}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        value={password}
        secureTextEntry={true}
      />
      <Button
        title="Login"
        onPress={onLogin}
      />
      <Button
        title="Don't have an account?"
        onPress={() =>
          navigation.navigate('Signup')
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
