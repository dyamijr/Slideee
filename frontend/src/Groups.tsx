import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Appbar } from 'react-native-paper';

export default function Groups({
  navigation,
}: {
  route: any;
  navigation: any;
}) {

  useEffect(() => {
    async function getCurrentUserGroups() {
      try {
        let response = await fetch(`${REACT_APP_BACKEND_URL}/users/me/groups`, {
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
      } catch(err) {
        console.error(`Error retrieving user groups: ${err}.`);
      }
    }
    getCurrentUserGroups();
  }, []);

  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
