import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './src/Landing/Landing';
import Login from './src/Login/Login';
import Signup from './src/Signup/Signup';
import Home from './src/Home/Home';
import Group from './src/Group/Group';
import CreateGroup from './src/CreateGroup/CreateGroup';
import Groups from './src/Groups/Groups';
import CreateEvent from './src/CreateEvent/CreateEvent';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchGroups from './src/SearchGroups/SearchGroups';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function AppNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
            navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options }: { options: any } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel as string;
            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Main"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupsNavigation}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account-group" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  )
}

function GroupsNavigationBar(props: any) {
  return (
    <Appbar.Header>
      {props.back ? <Appbar.BackAction onPress={props.navigation.goBack} /> : null}
      <Appbar.Content title={props.options.title} />
    </Appbar.Header>
  )
}

function GroupsNavigation() {
  return (
    <Stack.Navigator 
      initialRouteName='Main'
      screenOptions={{
        headerShown: true,
        header: (props) => <GroupsNavigationBar {...props} />,
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={Groups}
        options={{
          header: (props) => (
            <Appbar.Header>
              <Appbar.Content title="My Groups"/>
              <Appbar.Action icon="account-search" onPress={() => props.navigation.navigate("Search")} />
              <Appbar.Action icon="account-plus" onPress={() => props.navigation.navigate("CreateGroup")} />
            </Appbar.Header>
          ),
        }}  
      />
      <Stack.Screen 
        name="Search" 
        component={SearchGroups} 
        options={{
          title: "Search Groups"
        }}
      />
      <Stack.Screen 
        name="Group" 
        component={GroupNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="CreateGroup" 
        component={CreateGroup} 
        options={{
            title: "Create Group"
        }}
      />
    </Stack.Navigator>
  )
}

function GroupNavigationBar(props: any) {
  return (
    <Appbar.Header>
      {props.back ? <Appbar.BackAction onPress={props.navigation.goBack} /> : null}
      <Appbar.Content title={props.options.title} />
    </Appbar.Header>
  )
}

function GroupNavigation() {
  return (
    <Stack.Navigator 
      initialRouteName='Main'
      screenOptions={{
        headerShown: true,
        header: (props) => <GroupNavigationBar {...props} />,
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={Group} 
        options={({ navigation, route } : { navigation: any, route: any }) => {
          return {
            header: (props) => (
              <Appbar.Header>
                {props.back ? <Appbar.BackAction onPress={props.navigation.goBack} /> : null}
                <Appbar.Content title={route.params.groupName} />
                <Appbar.Action icon="account-plus" onPress={() => navigation.navigate("CreateEvent", {
                  groupName: route.params.groupName
                })}/>
              </Appbar.Header>
            )
          }
        }}
      />
      <Stack.Screen 
        name="CreateEvent" 
        component={CreateEvent} 
        options={{
          title: "Create Event"
        }}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={AppNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
