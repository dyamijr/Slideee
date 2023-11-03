import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import styles from '../../styles/main';

export default function Followers({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
    const [followers, setFollowers] = useState([]);
    
    useEffect(() => {
      async function getFollowers() {
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
        
            } catch (err) {
              console.error(`Error retriving group: ${err}.`)
            }
      }
      getFollowers();
    }, []);

    return(
        <View style={styles.container}>
            {followers.length === 0 ?(
                <Text>{route.params.groupName} has no followers.</Text>
            ) : (
        <React.Fragment key='1'>
          {followers.map((f) => (
            <Text>{f}</Text>
          ))}
        </React.Fragment>
            )}
        </View>
    );
}