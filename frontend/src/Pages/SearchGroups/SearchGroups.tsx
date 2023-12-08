import { REACT_APP_BACKEND_URL } from '@env';
import React, { useCallback, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';
import searchGroupStyle from './SearchGroupStyles';

function Item({ item, navigation }: { item: any, navigation: any }) {
  return (
    <Card style={searchGroupStyle.boxstyle2} mode="contained" onPress={() => navigation.navigate("Group", {
      screen: "Main",
      params: {
        groupName: item.groupName,
        displayName: item.displayName,
      }
    })}>
      <Card.Content>
        <Text style={searchGroupStyle.displayblock}>{item.displayName}</Text>
        <Text style={searchGroupStyle.nameblock}>{item.groupName}</Text>
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
    <View style = {searchGroupStyle.container}>
      <Searchbar
        style={searchGroupStyle.boxstyle1}
        placeholderTextColor= 'black'
        underlineColorAndroid='black'
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
        renderItem={(props) => 
        <Item navigation={navigation} {...props} />}
        keyExtractor={(item: any) => item._id}
      />
    </View>
  );
};