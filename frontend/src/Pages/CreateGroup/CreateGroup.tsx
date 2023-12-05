import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Checkbox, TextInput } from 'react-native-paper';
import createGroupStyle from './CreateGroupStyles';

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
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      navigation.navigate('Group', {
        screen: 'Main',
        params: {
          groupName: groupName,
        }
      });
    } catch (err) {
      console.error(`Error Creating Group: ${err}`);
    }
  }, [groupName, displayName, isPrivate]);

  return (
    <View style={createGroupStyle.container}>
      <Text style={createGroupStyle.titleblock}>Group Name</Text>
      <Text style={createGroupStyle.descriptionblock}>What shall others call you?</Text>
      <Text style={createGroupStyle.emptyspace}> </Text>
      <TextInput
        style={createGroupStyle.boxstyle1}
        placeholder="Group Name"
        value={groupName}
        onChangeText={(newValue) => setGroupName(newValue)}
      />

      <Text></Text>
      <Text style={createGroupStyle.titleblock}>Display Name</Text>
      <Text style={createGroupStyle.descriptionblock}>How will others remember you?</Text>
      <Text style={createGroupStyle.emptyspace}> </Text>
      <TextInput
        style={createGroupStyle.boxstyle1}
        placeholder="Display Name"
        value={displayName}
        onChangeText={(newValue) => setDisplayName(newValue)}
      />
      <Checkbox.Item
        mode="android"
        label='Private Group?'
        status={isPrivate ? 'checked' : 'unchecked'}
        onPress={() => {
          setIsPrivate(!isPrivate);
        }}
      />
      <Text></Text>
      <Button textColor= 'black' style={createGroupStyle.boxstyle2} mode="outlined" onPress={onCreateGroup}>
        Create Group
        </Button>
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
