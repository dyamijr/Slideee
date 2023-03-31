import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { REACT_APP_BACKEND_URL } from '@env';
import { Button, Checkbox, Chip, TextInput } from 'react-native-paper';


export default function GroupInvites({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  
 
  return (
    <View style={styles.container}>
      <Text>Group Invites</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collaborators: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:"center",
    alignItems: 'center',
  }
});


