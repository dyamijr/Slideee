import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';

export default function Home({ navigation }: { route: any; navigation: any }) {
  const [userSearchQuery, setUserSearchQuery] = useState('');
  //making a new event in the events array in the create events function 
  const[events, setEvents] = useState([]);
  let allEvents = [];
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
  //create an event in this function
  const createEvent = () => {
    setEvents([]); 
    allEvents.push([]);
  }



  const postEvent = () => {
    // Event post test function
    //add a post to the events 
    const [counter, setCounter] = useState(0);
    setCounter(1); 



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
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 24,
    marginBottom: 20,
  },
})};
