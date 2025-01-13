import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';

export default function Map({ route, navigation }) {
  const { latitude, longitude, title, description } = route.params || {}; // Recibir parámetros de navegación
  const [markers, setMarkers] = useState([]); // Estado para otros marcadores del mapa

  const initialRegion = {
    latitude: latitude || 41.3851, // Si no se pasa, usa una ubicación predeterminada
    longitude: longitude || 2.1734,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <FSuperior
          onPress={(id) => {
            if (id === 1) navigation.goBack();
            else if (id === 2) navigation.navigate('Search');
          }}
        />
      </View>

      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {/* Marcador recibido desde Add.js */}
        {latitude && longitude && (
          <Marker
            coordinate={{ latitude, longitude }}
            title={title || 'Ubicación seleccionada'}
            description={description}
          />
        )}
      </MapView>

      <View style={styles.bottomBar}>
        <FSection
          currentSection={2}
          onPress={(id) => {
            if (id === 1) navigation.navigate('All');
            else if (id === 2) navigation.navigate('Map');
            else if (id === 3) navigation.navigate('Add');
            else if (id === 4) navigation.navigate('Favorites');
            else if (id === 5) navigation.navigate('Account');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  topBar: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'flex-end',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
