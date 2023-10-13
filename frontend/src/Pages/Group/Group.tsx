import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';


export default function Group({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) 

{
  let [group, setGroup] = useState({
    _id: null,
  });
  
  
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

  return (
    <View style={styles.container}>
      <Text>{route.params.groupName}</Text>
      <Button 
      title="Group Invites" 
      color="#f194ff"
      onPress={() => navigation.navigate("GroupInvites", {
                  groupName: route.params.groupName,
                  groupId: group._id,
                })}>
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
