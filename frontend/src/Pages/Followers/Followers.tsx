import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import styles from '../../styles/main';
import followersStyles from './Followers.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
          console.error(`Error retriving followers: ${err}.`)
        }  
      }
      getFollowers();
    }, []);

    const removeFollower = useCallback(async(id: string) =>{
      try{
        console.log(id)
        let response = await fetch(`${REACT_APP_BACKEND_URL}/groups/${route.params.groupName}/removeFollower`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: id,
          }),
        });
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        for(let i = 0; i < followers.length; i++){
          let element = followers[i]
          if(element._id === id){
            followers.splice(i, 1);
            break;
          }
        }
      }
      catch (err){
        console.error(`Error removing follower: ${err}.`)
      }
    }, [followers])

    return(
      <View style={styles.container}>
            {followers.length === 0 ?(
                <Text>{route.params.groupName} has no followers.</Text>
            ) : (
        <React.Fragment>
          {followers.map((a) => (
            <View style={followersStyles.follower}>
              <View style={followersStyles.inline}>
                <View>
                  <Text style={followersStyles.followerText}>{a.displayName}</Text>
                  <Text style={followersStyles.followerSubText}>{'\t'}@{a.username}</Text>
                </View>
                <Icon name='account-remove' style={followersStyles.removeButton} color={'#FF0000'} size={24} onPress={() => removeFollower(a._id)}/>
              </View>
            </View>
            
          ))}
        </React.Fragment>
            )}
        </View>
    );
}