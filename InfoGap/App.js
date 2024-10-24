import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Pantalla de inicio
import Page1 from './screens/Page1'; // Pantalla 1
import Page2 from './screens/Page2'; // Pantalla 2
import DetailsScreen from './screens/DetailsScreen'; // Pantalla de detalles
import All from './screens/All'; // Pantalla de todos
import Map from './screens/Map'; // Pantalla de mapa
import Add from './screens/Add'; // Pantalla de añadir
import Favorites from './screens/Favorites'; // Pantalla de favoritos
import Account from './screens/Account'; // Pantalla de cuenta
import Filters from './screens/Filters'; // Pantalla de filtros
import CouplesRomantic from './screens/CouplesRomantic'; // Pantalla de parejas románticas
import CarCarMeets from './screens/CarCarMeets'; // Pantalla de encuentros de coches
import ECOroutes from './screens/ECOroutes'; // Pantalla de rutas ecológicas
import Monuments from './screens/Monuments'; // Pantalla de monumentos
import PartiesDiscos from './screens/PartiesDiscos'; // Pantalla de fiestas y discotecas
import Toprateddishes from './screens/Toprateddishes'; // Pantalla de platos mejor valorados
import Streams from './screens/Streams'; // Pantalla de transmisiones
import Viewpoints from './screens/Viewpoints'; // Pantalla de miradores


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
<<<<<<< Updated upstream
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false , animation: 'none'}} />
        <Stack.Screen name="Page1" component={Page1} options={{ headerShown: false , animation: 'none'}} />
        <Stack.Screen name="Page2" component={Page2} options={{ headerShown: false , animation: 'none'}} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false , animation: 'none'}} />
        <Stack.Screen name="All" component={All} options={{ headerShown: false , animation: 'none'}}/>
        <Stack.Screen name="Map" component={Map} options={{ headerShown: false , animation: 'none'}}/>
        <Stack.Screen name="Add" component={Add} options={{ headerShown: false , animation: 'none'}}/>
        <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false , animation: 'none'}}/>
        <Stack.Screen name="Account" component={Account} options={{ headerShown: false , animation: 'none'}}/>
=======
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Page1" component={Page1} options={{ headerShown: false }} />
        <Stack.Screen name="Page2" component={Page2} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="All" component={All} options={{ headerShown: false }} />
        <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
        <Stack.Screen name="Add" component={Add} options={{ headerShown: false }} />
        <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
        <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
        <Stack.Screen name="Filters" component={Filters} options={{ headerShown: false }} />
        <Stack.Screen name="CouplesRomantic" component={CouplesRomantic} options={{ headerShown: false }} />
        <Stack.Screen name="CarCarMeets" component={CarCarMeets} options={{ headerShown: false }} />
        <Stack.Screen name="ECOroutes" component={ECOroutes} options={{ headerShown: false }} />
        <Stack.Screen name="Monuments" component={Monuments} options={{ headerShown: false }} />
        <Stack.Screen name="PartiesDiscos" component={PartiesDiscos} options={{ headerShown: false }} />
        <Stack.Screen name="Toprateddishes" component={Toprateddishes} options={{ headerShown: false }} />
        <Stack.Screen name="Streams" component={Streams} options={{ headerShown: false }} />
        <Stack.Screen name="Viewpoints" component={Viewpoints} options={{ headerShown: false }} />

>>>>>>> Stashed changes
      </Stack.Navigator>
    </NavigationContainer>
  );
}
