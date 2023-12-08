import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
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
        let json = await response.json();
        console.log(json);
      } catch(err) {
        console.error(`Error retrieving current user: ${err}`);
      }
    }
    getCurrentUser();
  }, []);

  const postEvent = () => {
    // Event post test function
    const handleBoxPress = () => {
      console.log('Box Pressed!');
      //  functionality here
    };
    const handleButtonPress = () => {
      // Perform an action when the button is pressed
      Alert.alert('Button Pressed!', 'You pressed the button.');
//test button
    }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* Button component with onPress event */}
    <Button
      title="Press Me"
      onPress={handleButtonPress} // Assign the event handler function
    />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})};
