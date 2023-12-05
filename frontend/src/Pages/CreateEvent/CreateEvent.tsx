import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Checkbox, Chip, TextInput } from 'react-native-paper';
import createEventStyle from './CreateEventStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const MAX_COLLABORATORS = 5;

export default function CreateEvent(this: any, {
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
      <Text style={createEventStyle.titleblock}>Title</Text>
      <Text style={createEventStyle.descriptionblock}>Make it captivating!</Text>
      <Text style={createEventStyle.emptyspace}> </Text>
      <TextInput
        style={createEventStyle.boxstyle1}
        placeholderTextColor= 'black'
        underlineColor='black'
        activeUnderlineColor='black'
        activeOutlineColor='black'
        placeholder="Title"
        value={title}
        onChangeText={(newValue) => setTitle(newValue)}
      />

      <Text></Text>
      <Text style={createEventStyle.titleblock}>Description</Text>
      <Text style={createEventStyle.descriptionblock}>Summarize your event for users!</Text>
      <Text style={createEventStyle.emptyspace}> </Text>
      <TextInput
        style={createEventStyle.boxstyle1}
        placeholderTextColor= 'black'
        underlineColor='black'
        activeUnderlineColor='black'
        activeOutlineColor='black'
        placeholder="Description"
        value={description}
        onChangeText={(newValue) => setDescription(newValue)}
      />

      <Text></Text>
      <Text style={createEventStyle.titleblock}>Collaborators</Text>
      <Text style={createEventStyle.descriptionblock}>What other groups are co-hosting this event?</Text>
      <Text style={createEventStyle.emptyspace}> </Text>
      <View style={createEventStyle.collaborators}>
        {collaborators.map((collaborator, index) => (
          <View style={{display: 'flex', flexDirection: 'row'}} key={index}>
            <Chip style={createEventStyle.boxstyle} onClose={collaborator === route.params.groupName ? undefined : () => setCollaborators(collaborators.filter((item: any) => item !== collaborator))}  icon={() => (
            <Icon name="account-group" size={17} color="#E4A0A0"/> )}>
              {collaborator} 
              </Chip>
          </View>
        ))}
      <Text style={createEventStyle.emptyspace}></Text>
        {collaborators.length < MAX_COLLABORATORS && (
          <TextInput
            style={createEventStyle.boxstyle1}
            placeholderTextColor= 'black'
            underlineColor='black'
            activeUnderlineColor='black'
            activeOutlineColor='black'
            placeholder="Add Collaborator"
            value={newCollaborator}
            onChangeText={(newValue) => setNewCollaborator(newValue)}
            onSubmitEditing={onNewCollaboratorSubmitted}
          />
        )}

      <Text></Text>
      </View>
      <Button textColor= 'black' style={createEventStyle.boxstyle2} mode="outlined" onPress={onCreateEvent}>
        Create Event
      </Button>
    </View>
  );
}


