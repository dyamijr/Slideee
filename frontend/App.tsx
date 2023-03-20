import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './src/Landing';
import Login from './src/Login';
import Signup from './src/Signup';
import Home from './src/Home';
import Group from './src/Group';
import CreateGroup from './src/CreateGroup';
import Groups from './src/Groups';
import CreateEvent from './src/CreateEvent';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Group" component={Group} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="Groups" component={Groups} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
