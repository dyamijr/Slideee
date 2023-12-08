import React, { useEffect, useState, Component}  from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';


class Events extends Component {


  constructor(id, title) {
    super(id,title);

    // Initial state with an array of events
    this.state = {
      events: [
        { id: '1', title: 'Birthday Party' },
        { id: '2', title: 'Music Night' },
      ],
      newEventTitle: '', // State to hold the new event title
    };
  }
  render() {
    const { Events.events, newEventTitle } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Events in the Party</Text>

        {/* Input field to add new events */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Event Title"
            value={newEventTitle}
            onChangeText={this.handleInputChange}
          />
          <Button title="Add Event" onPress={this.handleAddEvent} />
        </View>

        {/* Display the list of events */}
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}



export default function Home({ navigation }: { route: any; navigation: any }) {
  const [userSearchQuery, setUserSearchQuery] = useState('');
  //making a new event in the events array in the create events function 
  const[events, setEvents] = useState([]);
  let allEvents = [1];
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

  const handleDeleteItem = (eventNum) => {
    // Filter out the item to be deleted based on its ID
    const updatedItems = allEvents.filter((item) => );
    setEvents(updatedItems);
    // You can perform additional delete actions here
  };


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
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});