import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importación de las pantallas
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import All from './screens/All';
import Map from './screens/Map';
import Add from './screens/Add';
import Favorites from './screens/Favorites';
import Account from './screens/Account';
import Search from './screens/Search';

// Creación del stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="All" component={All} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="Map" component={Map} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="Add" component={Add} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="Account" component={Account} options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false, animation: 'none' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
