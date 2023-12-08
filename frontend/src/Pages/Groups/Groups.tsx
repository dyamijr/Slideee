import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Appbar, Button } from 'react-native-paper';

export default function Groups({
  navigation,
}: {
  route: any;
  navigation: any;
}) {

  const [admin, setAdmin] = useState([]);
  const [follow, setFollow] = useState([]);
  const [me, setMe] = useState('');
  
  useEffect(() => {
    async function getCurrentUserGroups() {
      try {
        let response = await fetch(`${REACT_APP_BACKEND_URL}/users/me`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        let json = await response.json();
        setMe(json.id);
        response = await fetch(`${REACT_APP_BACKEND_URL}/groups/me/adminGroups`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        let json1 = await response.json();
        setAdmin(json1);
        console.log(json1);
        
        response = await fetch(`${REACT_APP_BACKEND_URL}/groups/me/followGroups`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        let json2 = await response.json();
        let missing = json2.filter((item: any) => json1.find((item2: any) => item['groupName'] === item2['groupName']) === undefined);
        setFollow(missing);
      } catch(err) {
        console.error(`Error retrieving user groups: ${err}.`);
      }
    }
    getCurrentUserGroups();
  }, []);


  return (
    <View style={styles.container}>
      {admin.length + follow.length === 0 ?(
        <Text>You are not the admin of any groups.</Text>
      ) : (
        <React.Fragment key='1'>
          {admin.map((g) => (
            <Button mode="outlined" onPress={() => 
              navigation.navigate('Group', {
              screen: 'Main',
              params: {
                groupName: g['groupName'],
                displayName: g['displayName'],
                isAdminView: true,
                me: me,
              }
            })
          }>{g['groupName']}</Button>
          ))}
          {follow.map((g) => (
            <Button key={g['groupName']} onPress={() => 
              navigation.navigate('Group', {
              screen: 'Main',
              params: {
                groupName: g['groupName'],
                displayName: g['displayName'],
                isAdminView: false,
                me: me,
              }
            })
          }>{g['groupName']}</Button>
          ))}
        </React.Fragment>
        
      )}
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
