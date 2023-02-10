import React, {useState} from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';

export default function Signup({navigation}) {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        onChangeText={(value) => setUsername(value)}
        value={username}
      />
      <TextInput
        placeholder="Display Name"
        onChangeText={(value) => setDisplayName(value)}
        value={displayName}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        value={password}
        secureTextEntry={true}
      />
      <Button
        title="Signup"
      />
      <Button
        title="Already have an account?"
        onPress={() =>
          navigation.navigate('Login')
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
