import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Checkbox, Chip, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import GroupInviteStyle from './InviteStyle'



export default function Invites({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {

  const [Invitations,setInvitations] = useState([]);
  
  useEffect(() => {
    async function getallInvites() {
      try {
        let response = await fetch(`${REACT_APP_BACKEND_URL}/inviteHandler/allinvites`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        let json = await response.json();
        console.log(json);
        setInvitations(json);
        
       
      } catch(err) {
        console.error(`Error retrieving user invites: ${err}.`);
      }
  }
  getallInvites();
  console.log("hi");
  console.log(Invitations);
}, []); 
   
const renderItem = ( item:any ) => (
  <View style={ {flexDirection: 'row' }}>
     <Text>{item['sender']}</Text>
    <View style={{ flexDirection: 'row' }}>
    <Button style = {GroupInviteStyle.button} mode="outlined" >
        <Icon name="check" size={25} color="green" />
      </Button>
      <Button style = {GroupInviteStyle.button} mode="outlined" >
        <Icon2 name="x" size={25} color="red" />
      </Button>
    </View>
  </View>
 
);

return (
  
    <View style={styles.container}>
      {Invitations.length === 0 ?(
        <Text>You have no current Invites</Text>
      ):(
        <React.Fragment>
          { 
             Invitations.map ( (i) => (
              renderItem(i)
              
             )
             
          )}
          </React.Fragment>)}
       
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