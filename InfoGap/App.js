import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Pantalla d'inici
import Page1 from './screens/Page1'; // Pantalla 1
import Page2 from './screens/Page2'; // Pantalla 1
import DetailsScreen from './screens/DetailsScreen'; // Pantalla de detalls
import All from './screens/All'; // Pantalla 1

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Page1" component={Page1} options={{ headerShown: false }} />
        <Stack.Screen name="Page2" component={Page2} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="All" component={All} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
