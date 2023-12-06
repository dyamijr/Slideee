import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Chip, Text, TextInput } from 'react-native-paper';
import styles from '../../styles/main';
import adminStyles from './Admin.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      const removeAdmin = useCallback(async(id: string) =>{
        try{
          console.log(id)
          let response = await fetch(`${REACT_APP_BACKEND_URL}/groups/${route.params.groupName}/removeAdmin`, {
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
          for(let i = 0; i < admin.length; i++){
            let element = admin[i]
            if(element._id === id){
              admin.splice(i, 1);
              break;
            }
          }
          setAdmin([...admin])
        }
        catch (err){
          console.error(`Error removing follower: ${err}.`)
        }
      }, [admin])
      function Item({ item }: { item: any}) {
        return (
          <View style={adminStyles.admin}>
            <View style={adminStyles.inline}>
              <View>
               <Text style={adminStyles.adminText}>{item.displayName}</Text>
               <Text style={adminStyles.adminSubText}>{'\t'}@{item.username}</Text>
              </View>
              {route.params.isOwnerView ? (
                  <Icon name='account-remove' style={adminStyles.removeButton} color={'#FF0000'} size={24} onPress={() => removeAdmin(item._id)}/>
                  ):(null)}
            </View>
          </View>
        )
      }
    
    return(
        <View style={styles.container}>
            {admin.length === 0 ?(
                <Text>{route.params.groupName} has no admin.</Text>
            ) : (
              <View style={adminStyles.adminBox}>
                <FlatList 
                  data={admin}
                  renderItem={(props) => <Item {...props}/>}
                  keyExtractor={(item: any) => item._id}
                />
              </View>
        // <React.Fragment>
        //   {admin.map((a) => (
        //     <View style={adminStyles.admin}>
        //       <Text style={adminStyles.adminText}>{a.displayName}</Text>
        //       <Text style={adminStyles.adminSubText}>{'\t'}@{a.username}</Text>
        //     </View>
            
        //   ))}
        // </React.Fragment>
            )}
        </View>
    );
}