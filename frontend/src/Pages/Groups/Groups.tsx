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
  useEffect(() => {
    async function getCurrentUserGroups() {
      try {
        let response = await fetch(`${REACT_APP_BACKEND_URL}/groups/me/adminGroups`, {
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
        setAdmin(json);
        console.log(json);
        
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
        json = await response.json();
        setFollow(json);
        console.log(json);

      } catch(err) {
        console.error(`Error retrieving user groups: ${err}.`);
      }
    }
    getCurrentUserGroups();
  }, []);

  const test = async() => console.log('test');

  return (
    <View style={styles.container}>
      {admin.length === 0 ?(
        <Text>You are not the admin of any groups.</Text>
      ) : (
        <React.Fragment key='1'>
          {admin.map((g) => (
            <Button mode="outlined" onPress={() => 
              navigation.navigate('Group', {
              screen: 'Main',
              params: {
                groupName: g['groupName'],
              }
            })
          }>{g['groupName']}</Button>
          ))}
          {follow.map((g) => (
            <Button onPress={() => 
              navigation.navigate('Group', {
              screen: 'Main',
              params: {
                groupName: g['groupName'],
              }
            })
          }>{g['groupName']}</Button>
          ))}
        </React.Fragment>
        
      )}
      {/* {this.state.adminGroups.length === 0 ? (
                <p>You are not the admin of any groups.<br/> <br/></p>
              ) : (
                <React.Fragment>
                  {this.state.adminGroups.map((e) => (
                    <Link to={"/groups/" + e.id}>
                      <button style={{width: "20em"}} className="button">{e.name}</button>
                    </Link>
                  ))}
                </React.Fragment>
              )} */}
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
