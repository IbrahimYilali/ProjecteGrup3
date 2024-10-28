import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Pantalla d'inici
import Page1 from './screens/Page1'; // Pantalla 1
import Page2 from './screens/Page2'; // Pantalla 1
import DetailsScreen from './screens/DetailsScreen'; // Pantalla de detalls
import All from './screens/All'; // Pantalla 1
import Map from './screens/Map';
import Add from './screens/Add';
import Information from './screens/Information';
import Favorites from './screens/Favorites';
import Account from './screens/Account';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false , animation: 'none'}} />
        <Stack.Screen name="Page1" component={Page1} options={{ headerShown: false , animation: 'none'}} />
        <Stack.Screen name="Page2" component={Page2} options={{ headerShown: false , animation: 'none'}} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false , animation: 'none'}} />
        <Stack.Screen name="All" component={All} options={{ headerShown: false , animation: 'none'}}/>
        <Stack.Screen name="Map" component={Map} options={{ headerShown: false , animation: 'none'}}/>
        <Stack.Screen name="Add" component={Add} options={{ headerShown: false , animation: 'none'}}/>
        <Stack.Screen name="Information" component={Information} />
        <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false , animation: 'none'}}/>
        <Stack.Screen name="Account" component={Account} options={{ headerShown: false , animation: 'none'}}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
