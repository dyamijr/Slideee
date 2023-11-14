import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import styles from '../../styles/main';
import groupStyles from './GroupStyle';

export default function Group({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {

  const[group, setGroup] = useState();
  const[admin, setAdmin] = useState([]);
  const[followers, setFollowers] = useState([]);
      
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
        setGroup(json);
        console.log(json);
      } catch(err) {
        console.error(`Error retrieving group: ${err}.`)
      }
    }
    getGroup();
  }, []);

  const onAdminClick = async() => {
    try {
      let response = await fetch(`${REACT_APP_BACKEND_URL}/groups/${route.params.groupName}/admins`, {
        method: 'GET',
      },
      );
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      let json = await response.json();
      setAdmin(json);
      console.log(json);
      navigation.navigate('Admin', {
        screen: 'Main',
        params: {
          groupName: route.params.groupName,
          admins: json,
        }
      })
    } catch (err) {
      console.error(`Error retriving admins: ${err}.`)
    }
  };

  const onFollowersClick = async() => {
    try {
      let response = await fetch(`${REACT_APP_BACKEND_URL}/groups/${route.params.groupName}/followers`, {
        method: 'GET',
      },
      );
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      let json = await response.json();
      setFollowers(json);
      console.log(json);
      navigation.navigate('Followers', {
        screen: 'Main',
        params: {
          groupName: route.params.groupName,
          followers: json,
        }
      })
    } catch (err) {
      console.error(`Error retriving admins: ${err}.`)
    }
  };

  return (
    <View >
      <View style={groupStyles.container}>
        <Button style={groupStyles.button} onPress={onAdminClick}>
          Admin
        </Button>
        <Button style={groupStyles.button} onPress={onFollowersClick}>
          Followers
        </Button>
      </View>

    </View>
  );
}


