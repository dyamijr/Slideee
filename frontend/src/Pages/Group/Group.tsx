import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import styles from '../../styles/main';
import groupStyles from './GroupStyle';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

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
  const[isOwnerView, setIsOwnerView] = useState(false);
  const[isFollower, setIsFollower] = useState(false);
      
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

        response = await fetch(`${REACT_APP_BACKEND_URL}/groups/${route.params.groupName}/admins`, {
          method: 'GET',
        },
        );
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        json = await response.json();
        setAdmin(json);

        response = await fetch(`${REACT_APP_BACKEND_URL}/groups/${route.params.groupName}/followers`, {
          method: 'GET',
        },
        );
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        json = await response.json();
        setFollowers(json);
        if(json.includes(route.params.me)){
          setIsFollower(true);
        }


      } catch(err) {
        console.error(`Error retrieving group: ${err}.`)
      }
    }
    getGroup();
  }, []);

  const onAdminClick = async() => {
    try {
      navigation.navigate('Admin', {
        screen: 'Main',
        params: {
          groupName: route.params.groupName,
          admins: admin,
          isAdminView: route.params.isAdminView,
          isOwnerView: await isOwner(),
        }
      })
    } catch (err) {
      console.error(`Error retriving admins: ${err}.`)
    }
  };

  const isOwner = async function () {
    try {
      if(route.params.me === group.owner){
        return true;
      }
      return false;        
    } catch (err) {
      console.error(`Error retriving admins: ${err}.`)
    }
  }

  const onFollowersClick = async() => {
    try {
      navigation.navigate('Followers', {
        screen: 'Main',
        params: {
          groupName: route.params.groupName,
          followers: followers,
          isAdminView: route.params.isAdminView
        }
      })
    } catch (err) {
      console.error(`Error retriving admins: ${err}.`)
    }
  };

  const onFollow = useCallback(async(id: string) => {
    try {
      let response = await fetch(`${REACT_APP_BACKEND_URL}/inviteHandler/${route.params.groupName}/follow`,
        {
          method: 'POST',
        },
      );
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      let json = await response.json();
      setGroup(json);
      console.log(json);
      setFollowers([...followers])

    } catch(err) {
      console.error(`Error following group: ${err}.`)
    }
  }, [followers]);
  const onUnFollow = async() => {
    try{
      let response = await fetch(`${REACT_APP_BACKEND_URL}/groups/${route.params.groupName}/unfollow`,
        {
          method: 'POST',
        },
      );
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      let json = await response.json();
      setGroup(json);
      console.log(json);
    } catch(err) {
      console.error(`Error following group: ${err}.`)
    }
  };

  return (
    <View style={groupStyles.fullbox}>
      <View style={groupStyles.textStyle}>
        <Text>@{route.params.groupName}</Text>
      </View>
      <View style={groupStyles.textStyle}>
        <Text>Black Students’ Alliance @ RPI </Text>
      </View>
      <View style={groupStyles.container}>
        <Button style={groupStyles.button} textColor="red" onPress={onAdminClick}>
          Admin
        </Button>
        <Button style={groupStyles.button} textColor="red" onPress={onFollowersClick}>
          Followers
        </Button>
        <Button style={groupStyles.button2} textColor="red" onPress={onFollowersClick}>
        {isFollower ? (
            <Icon name='user-unfollow' color={'#FF0000'} size={18} />
          ):(
            <Icon name='user-follow' color={'#00FF00'} size={18} />
          )}
        </Button>
      </View>

    </View>
  );
}


