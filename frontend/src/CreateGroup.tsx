import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Input from './components/Input';
import { REACT_APP_BACKEND_URL } from '@env';

export default function CreateGroup({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [groupName, setGroupName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const onCreateGroup = useCallback(async () => {
    try {
      let response = await fetch(`${REACT_APP_BACKEND_URL}/groups/new`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupName: groupName,
          displayName: displayName,
          isPrivate: isPrivate,
        }),
      });
      if (response.ok) {
        navigation.navigate('Group', {
          groupName: groupName,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [groupName, displayName, isPrivate]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Group Name"
        value={groupName}
        onChangeText={(newValue) => setGroupName(newValue)}
      />
      <Input
        placeholder="Display Name"
        value={displayName}
        onChangeText={(newValue) => setDisplayName(newValue)}
      />
      <Button
        title={`isPrivate: ${isPrivate}`}
        onPress={() => setIsPrivate(!isPrivate)}
      />
      <Button title={`Create Group`} onPress={onCreateGroup} />
      <Button title={'Home'} onPress={() => navigation.navigate('Home')} />
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
