import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import styles from '../../styles/main';
import followersStyles from './Followers.style';

export default function Followers({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
    const [followers, setFollowers] = useState<any[]>([]);
    
    useEffect(() => {
      async function getFollowers() {
        try {
          let followers = route.params.followers;
          const promises = await Promise.all(followers.map(f => fetch(`${REACT_APP_BACKEND_URL}/users/id/${f}`)));
          const productsArray = await Promise.all(promises.map(p => p.json()))
          setFollowers(productsArray);
        } catch (err) {
          console.error(`Error retriving admins: ${err}.`)
        }  
      }
      getFollowers();
    }, []);

    return(
      <View style={styles.container}>
            {followers.length === 0 ?(
                <Text>{route.params.groupName} has no followers.</Text>
            ) : (
        <React.Fragment>
          {followers.map((a) => (
            <View style={followersStyles.follower}>
              <Text style={followersStyles.followerText}>{a.displayName}</Text>
              <Text style={followersStyles.followerSubText}>{'\t'}@{a.username}</Text>
            </View>
            
          ))}
        </React.Fragment>
            )}
        </View>
    );
}