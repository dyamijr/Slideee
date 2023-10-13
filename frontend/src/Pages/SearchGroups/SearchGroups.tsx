import { REACT_APP_BACKEND_URL } from '@env';
import React, { useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';

function Item({ item, navigation }: { item: any, navigation: any }) {
  return (
    <Card mode="contained" onPress={() => navigation.navigate("Group", {
      screen: "Main",
      params: {
        groupName: item.groupName,
      }
    })}>
      <Card.Content>
        <Text variant="titleLarge">{item.displayName}</Text>
        <Text variant="titleMedium">{item.groupName}</Text>
      </Card.Content>
    </Card>
  )
}

export default function SearchGroups(props: any) {
  
  let {navigation, route} = props;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  let onSearchSubmit = useCallback(async () => {
    let response = await fetch(`${REACT_APP_BACKEND_URL}/groups?groupName=${searchQuery}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    let json = await response.json();
    setSearchResults(json);
    console.log(json);
  }, [searchQuery])

  return (
    <View>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={(newValue) => {
          setSearchResults([]);
          setSearchQuery(newValue);
        }}
        onSubmitEditing={onSearchSubmit}
      />
      <FlatList 
        data={searchResults}
        renderItem={(props) => <Item navigation={navigation} {...props}/>}
        keyExtractor={(item: any) => item._id}
      />
    </View>
  );
};
