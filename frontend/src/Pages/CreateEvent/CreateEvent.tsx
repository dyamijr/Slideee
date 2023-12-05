import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Checkbox, Chip, TextInput } from 'react-native-paper';
import createEventStyle from './CreateEventStyles';

const MAX_COLLABORATORS = 2;

export default function CreateEvent({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newCollaborator, setNewCollaborator] = useState('');
  const [collaborators, setCollaborators] = useState([route.params.groupName]);

  const onCreateEvent = useCallback(async () => {
    try {
      let response = await fetch(`${REACT_APP_BACKEND_URL}/inviteHandler/newEvent`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          collaborators: collaborators,
        }),
      });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  }, [title, description]);

  const onNewCollaboratorSubmitted = useCallback(async () => {
    try {
      if (collaborators.length >= MAX_COLLABORATORS) {
        throw new Error("Max Collaborators");
      }
      let response = await fetch(
        `${REACT_APP_BACKEND_URL}/groups/${newCollaborator}`,
        {
          method: 'GET',
        },
      );
      if (!response.ok) {
        throw new Error("Invalid Group");
      }
      setNewCollaborator("");
      setCollaborators([...collaborators, newCollaborator]);
    } catch(err) {
      console.error(`Error adding collaboration group: ${err}.`);
    }
  }, [newCollaborator]);

  return (
    <View style={createEventStyle.container}>
      <Text style={createEventStyle.titleblock}> Title</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(newValue) => setTitle(newValue)}
      />
      <Text></Text>
      <Text style={createEventStyle.titleblock}> Description</Text>
      <Text style={createEventStyle.descriptionblock}>Summarize Your Event for Users!</Text>
      <Text style={createEventStyle.emptyspace}> </Text>
      <TextInput
        style={createEventStyle.boxstyle}
        placeholder="Description"
        value={description}
        onChangeText={(newValue) => setDescription(newValue)}
      />
      <Text></Text>
      <Text style={createEventStyle.titleblock}>Collaborators</Text>
      <Text style={createEventStyle.descriptionblock}>What other group is co-hosting this event?</Text>
      <Text style={createEventStyle.emptyspace}> </Text>
      <View style={createEventStyle.collaborators}>
        {collaborators.map((collaborator, index) => (
          <View style={{display: 'flex', flexDirection: 'row'}} key={index}>
            <Chip style={createEventStyle.boxstyle} onClose={collaborator === route.params.groupName ? undefined : () => setCollaborators(collaborators.filter((item: any) => item !== collaborator))} icon="account-group">
              {collaborator} 
              </Chip>
          </View>
        ))}
      <Text></Text>
        {collaborators.length < MAX_COLLABORATORS && (
          <TextInput
            style={createEventStyle.boxstyle}
            placeholder="Add Collaborator"
            value={newCollaborator}
            onChangeText={(newValue) => setNewCollaborator(newValue)}
            onSubmitEditing={onNewCollaboratorSubmitted}
          />
        )}
      <Text></Text>
      </View>
      <Button style={createEventStyle.boxstyle} mode="outlined" onPress={onCreateEvent}>
        Create Event
      </Button>
    </View>
  );
}


