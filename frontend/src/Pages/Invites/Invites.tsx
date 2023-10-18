import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Checkbox, Chip, TextInput } from 'react-native-paper';
import GroupInviteStyle from './InviteStyle'



export default function Invites({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {

  const [eventCollaborationRequests,setEventCollaborationRequest] = useState([]);

  // useEffect(() => {
  //   async function getEventCollaborationRequest() {
  //     try {
  //       let response = await fetch(`${REACT_APP_BACKEND_URL}/groups/${route.params.groupId}/eventCollaborationRequests`, {
  //         method: 'GET',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         }
  //       });
  //       if (!response.ok) {
  //         throw new Error(`${response.status}`);
  //       }
  //       let json = await response.json();
  //       setEventCollaborationRequest(json);
  //       console.log(json);
  //     } catch(err) {
  //       console.error(`Error retrieving user groups: ${err}.`);
  //     }
  //   }
    
  //  getEventCollaborationRequest();
  // }, []);

  //console.log(route.params);
  //let requestDisplay =<Text>You have {eventCollaborationRequests.length} request</Text>;
  return (
  
    <View style={styles.container}>
     <Text>Current Invites</Text>
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
  collaborators: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:"center",
    alignItems: 'center',
  }
});