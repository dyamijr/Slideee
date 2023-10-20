import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';

export default function Home({ navigation }: { route: any; navigation: any }) {
  const [userSearchQuery, setUserSearchQuery] = useState('');

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let response = await fetch(`${REACT_APP_BACKEND_URL}/users/me`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        let json = await response.text();
        console.log(json);
      } catch(err) {
        console.error(`Error retrieving current user: ${err}`);
      }
    }
    getCurrentUser();
  }, []);

  return (
    <View style={styles.container}>

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
