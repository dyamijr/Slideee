import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import styles from '../../styles/main';

export default function Admin({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
    const [admin, setAdmin] = useState([]);

    useEffect(() => {
        async function getAdmins() {
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
          
              } catch (err) {
                console.error(`Error retriving group: ${err}.`)
              }
        }
        getAdmins();
      }, []);
    

    return(
        <View style={styles.container}>
            {admin.length === 0 ?(
                <Text>{route.params.groupName} has no admin.</Text>
            ) : (
        <React.Fragment key='1'>
          {admin.map((a) => (
            <Text>{a}</Text>
          ))}
        </React.Fragment>
            )}
        </View>
    );
}