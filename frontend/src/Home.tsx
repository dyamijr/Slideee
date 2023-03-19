import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Input from './components/Input';

export default function Home({ navigation }: { route: any; navigation: any }) {
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [groupSearchQuery, setGroupSearchQuery] = useState('');

  useEffect(() => {
    async function getCurrentUser() {
      let response = await fetch('http://129.161.251.215:1234/users/me', {
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
      <Input
        value={groupSearchQuery}
        onChangeText={(newValue) => setGroupSearchQuery(newValue)}
        placeholder={'Group Name'}
      />
      <Button
        title={'Search Group'}
        onPress={() =>
          navigation.navigate('Group', {
            groupName: groupSearchQuery,
          })
        }
      />
      <Button
        title={'Create Group'}
        onPress={() => navigation.navigate('CreateGroup')}
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
