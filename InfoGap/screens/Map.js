import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';

export default function Map({ route, navigation }) {
  const { latitude, longitude, locationName, description } = route.params;

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <FSuperior
          onPress={(id) => {
            if (id === 1) navigation.goBack();
            else if (id === 2) navigation.navigate("Home");
          }}
        />
      </View>

      {/* Mapa principal */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={locationName}
          description={description}
        />
      </MapView>

      {/* Barra inferior */}
      <View style={styles.bottomBar}>
        <FSection
          currentSection={2} // Indica que estamos en la sección del mapa
          onPress={(id) => {
            if (id === 1) navigation.navigate("All");
            else if (id === 2) navigation.navigate("Map"); // Queda en el mapa
            else if (id === 3) navigation.navigate("Add");
            else if (id === 4) navigation.navigate("Favorites");
            else if (id === 5) navigation.navigate("Account");
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
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80, // Altura de la barra inferior
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
