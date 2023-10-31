import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import styles from '../../styles/main';

export default function Group({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  useEffect(() => {
    async function getGroup() {
      try {
        let response = await fetch(
          `${REACT_APP_BACKEND_URL}/groups/${route.params.groupName}`,
          {
            method: 'GET',
          },
        );
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        let json = await response.json();
        console.log(json);
      } catch(err) {
        console.error(`Error retrieving group: ${err}.`)
      }
    }
    getGroup();
  }, []);

  const test = async() => console.log('test');

  const getAdmins = useCallback(async () => {
    try {
      let response = await fetch(`${REACT_APP_BACKEND_URL}/${route.params.groupName}/admins`, {
        method: 'GET',
      },
      );
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      let json = await response.json();
      console.log(json);

    } catch (err) {
      console.error(`Error retriving group: ${err}.`)
    }
  }, []);

  return (
    <View style={styles.container}>
      <Button onPress={getAdmins}>
        Admin
      </Button>
      <Button onPress={test}>
        Followers
      </Button>
      <Text>{route.params.groupName}</Text>
      <Text>baller</Text>
    </View>
  );
}


