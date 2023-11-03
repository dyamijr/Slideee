import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import styles from '../../styles/main';

export default function AddAdmin({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
    const [newUsername, setNewUsername] = useState('');
    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState('');
    const [group, setGroup] = useState('');

    useEffect(() => {
        async function getAdmins() {
            try {
                let response = await fetch(`${REACT_APP_BACKEND_URL}/groups/${route.params.groupName}`, {
                  method: 'GET',
                },
                );
                if (!response.ok) {
                  throw new Error(`${response.status}`);
                }
                let json = await response.json();
                setGroup(json.groupName);
                console.log(json);
          
              } catch (err) {
                console.error(`Error retriving group: ${err}.`)
              }
        }
        getAdmins();
      }, []);
    
      const onEnterAdmin = useCallback(async () => {
        try {
          let response = await fetch(
            `${REACT_APP_BACKEND_URL}/users/${newUsername}`,
            {
              method: 'GET',
            },
          );
          if (!response.ok) {
            throw new Error("User Does not Exist");
          }
          let json = await response.json();
          setUsername(json.username);
          setUserId(json._id);
          console.log(userId);
        } catch(err) {
          console.error(`Error adding admin group: ${err}.`);
        }
      }, [userId, username, newUsername]);

      const onAddAdmin = useCallback(async () => {
        try {
          let response = await fetch(`${REACT_APP_BACKEND_URL}/inviteHandler/${group}/addAdmin`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: userId,
            }),
          });
          if (!response.ok) {
            throw new Error(`${response.status}`);
          }
          navigation.goBack();
        } catch (err) {
          console.error(err);
        }
      }, [username]);

    return(      
        <View style={styles.container}>
          <View style={styles.collaborators}>
            <Text>Username</Text>
            <View style={{display: 'flex', flexDirection: 'row'}} >
              <Chip icon="account-group">{username}</Chip>
            </View>
            {username === null ? (
            <TextInput
              placeholder="Username"
              value={newUsername}
              onChangeText={(newValue) => setNewUsername(newValue)}
              onSubmitEditing={onEnterAdmin}
            />
            ):(
              <></>
            )}
            <Button mode="outlined" onPress={onAddAdmin}>
              Add
            </Button>
          </View>
        </View>
    );
}

