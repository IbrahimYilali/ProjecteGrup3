import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Asegúrate de importar el componente de mapa
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior'; // Asegúrate de que FSuperior esté importado correctamente

export default function Map({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Barra de navegación superior */}
      <View style={styles.topBar}>
        <FSuperior 
          onPress={(id) => {
            if (id === 1) navigation.goBack(); 
            else if (id === 2) navigation.navigate("Search");
          }} 
        />
      </View>

      {/* Mapa de Apple */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.3851, // Latitud de Barcelona
          longitude: 2.1734, // Longitud de Barcelona
          latitudeDelta: 0.0922, // Rango de visualización
          longitudeDelta: 0.0421,
        }}
      >
        <Marker 
          coordinate={{ latitude: 41.3851, longitude: 2.1734 }} // Coordenadas del marcador
          title="Barcelona"
          description="Ciudad de Barcelona"
        />
      </MapView>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <FSection 
          currentSection={2} 
          onPress={(id) => {
            if (id === 1) navigation.navigate("All"); 
            else if (id === 2) navigation.navigate("Map");
            else if (id === 3) navigation.navigate("Add"); 
            else if (id === 4) navigation.navigate("Favorites"); 
            else if (id === 5) navigation.navigate("Account");  
          }} 
        />
      </View>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fondo blanco
  },
  topBar: {
    height: 80, // Altura de la barra superior
    backgroundColor: '#FFF', // Fondo blanco
    borderBottomWidth: 1, // Línea inferior de la barra
    borderBottomColor: '#ccc', // Color de la línea
    justifyContent: 'flex-end', // Alinea el contenido a la parte inferior
    paddingBottom: 0, // Espacio inferior para mejor visualización
  },
  map: {
    flex: 1, // Asegúrate de que el mapa ocupe el espacio disponible
    marginBottom: 60, // Para que no se superponga con la barra inferior
  },
  bottomBar: {
    position: 'absolute', // Posiciona absolutamente la barra inferior
    bottom: 0, // Ancla a la parte inferior
    left: 0,
    right: 0,
    height: 60, // Altura de la barra inferior
    backgroundColor: '#FFF', // Fondo blanco para la barra inferior
    borderTopWidth: 1, // Línea superior de la barra
    borderTopColor: '#ccc', // Color de la línea
  },
});
