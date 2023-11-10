import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import styles from '../../styles/main';
import adminStyles from './Admin.style';

export default function Admin({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
    const [admin, setAdmin] = useState<any[]>([]);

    useEffect(() => {
        async function getAdmins() {
            try {
                let admins = route.params.admins;
                const promises = await Promise.all(admins.map(a => fetch(`${REACT_APP_BACKEND_URL}/users/id/${a}`)));
                const productsArray = await Promise.all(promises.map(p => p.json()))
                setAdmin(productsArray);
                console.log(admin);
              } catch (err) {
                console.error(`Error retriving admins: ${err}.`)
              }
        }

        getAdmins();
      }, []);
    
      async function getAdminObjects(json: any) {
        try {
          for (let i = 0; i < json.length; i++) {
            console.log('test');
            console.log(json.length);
            console.log(i);
            console.log(json[i]);
            let response = await fetch(`${REACT_APP_BACKEND_URL}/users/me}`, {
              method: 'GET',
            },
            );
            if (!response.ok) {
              throw new Error(`${response.status}`);
            }
            let json1 = await response.json();
            console.log(json1);              
          }
        } catch (err) {
          console.error(`Error retriving admins: ${err}.`)
        }
      }

    return(
        <View style={styles.container}>
            {admin.length === 0 ?(
                <Text>{route.params.groupName} has no admin.</Text>
            ) : (
        <React.Fragment>
          {admin.map((a) => (
            <View style={adminStyles.admin}>
              <Text>{a.displayName}</Text>
              <Text>@{a.username}</Text>
            </View>
            
          ))}
        </React.Fragment>
            )}
        </View>
    );
}