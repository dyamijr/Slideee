import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Input from './components/Input';
import { REACT_APP_BACKEND_URL } from '@env';

export default function Home({ navigation }: { route: any; navigation: any }) {
  const [userSearchQuery, setUserSearchQuery] = useState('');

  useEffect(() => {
    async function getCurrentUser() {
      let response = await fetch(`${REACT_APP_BACKEND_URL}/users/me`, {
        method: 'GET',
      });
      let json = await response.json();
      console.log(json);
    }
    getCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      <Input
        value={userSearchQuery}
        onChangeText={(newValue) => setUserSearchQuery(newValue)}
        placeholder={'Username'}
      />
      <Button title={'Search User'} />
      <Button
        title={'Groups'}
        onPress={() =>
          navigation.navigate('Groups')
        }
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
