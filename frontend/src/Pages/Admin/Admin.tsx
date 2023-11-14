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
              } catch (err) {
                console.error(`Error retriving admins: ${err}.`)
              }
        }

        getAdmins();
      }, []);
    
    return(
        <View style={styles.container}>
            {admin.length === 0 ?(
                <Text>{route.params.groupName} has no admin.</Text>
            ) : (
        <React.Fragment>
          {admin.map((a) => (
            <View style={adminStyles.admin}>
              <Text style={adminStyles.adminText}>{a.displayName}</Text>
              <Text style={adminStyles.adminSubText}>{'\t'}@{a.username}</Text>
            </View>
            
          ))}
        </React.Fragment>
            )}
        </View>
    );
}