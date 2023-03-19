import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Input from './components/Input';
import { REACT_APP_BACKEND_URL } from '@env';

export default function Groups({ navigation }: { route: any; navigation: any }) {
  const [groupSearchQuery, setGroupSearchQuery] = useState('');

  useEffect(() => {
    async function getCurrentUserGroups() {
      let response = await fetch(`${REACT_APP_BACKEND_URL}/users/me/groups`, {
        method: 'GET',
      });
      let json = await response.json();
      console.log(json);
    }
    getCurrentUserGroups();
  }, []);

  return (
    <View style={styles.container}>
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
