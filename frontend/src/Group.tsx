import React, { useEffect } from 'react';
import { StyleSheet, View,Text } from 'react-native';

import { REACT_APP_BACKEND_URL } from '@env';
import { Button } from 'react-native-paper';

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

  return (
    <View style={styles.container}>
      <Text>{route.params.groupName}</Text>
      
      <Button mode="outlined" onPress={() => navigation.navigate("GroupInvites", {
                  groupName: route.params.groupName
                })}>
        Group Invites
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
 
