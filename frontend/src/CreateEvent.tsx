import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Input from './components/Input';
import { REACT_APP_BACKEND_URL } from '@env';

export default function CreateEvent({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onCreateEvent = useCallback(async () => {
    try {
      console.log(route);
      let response = await fetch(`${REACT_APP_BACKEND_URL}/events/new`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          collaborators: [route.params.groupName]
        }),
      });
      if (response.ok) {
        navigation.navigate('Group', {
          groupName: route.params.groupName,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [title, description]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Title"
        value={title}
        onChangeText={(newValue) => setTitle(newValue)}
      />
      <Input
        placeholder="Description"
        value={description}
        onChangeText={(newValue) => setDescription(newValue)}
      />
      <Button title={`Create Event`} onPress={onCreateEvent} />
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
