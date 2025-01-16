import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';

export default function Map({ route, navigation }) {
  const { latitude, longitude, title, description } = route.params || {};
  const [markers, setMarkers] = useState([]); // Estat per als markers de Firebase

  const initialRegion = {
    latitude: latitude || 41.3851,
    longitude: longitude || 2.1734,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Funció per obtenir markers des de Firebase
  const fetchMarkers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Preguntes'));
      const fetchedMarkers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        latitude: doc.data().Latitude || 41.3851, // Coordenades per defecte
        longitude: doc.data().Longitude || 2.1734,
        title: doc.data().Title || 'Sense títol',
        description: doc.data().Description || 'Sense descripció',
      }));
      setMarkers(fetchedMarkers);
    } catch (error) {
      console.error('Error fetching markers: ', error);
    }
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

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
        {/* Marker principal */}
        {latitude && longitude && (
          <Marker
            coordinate={{ latitude, longitude }}
            title={title || 'Ubicació seleccionada'}
            description={description}
          />
        )}

        {/* Markers recuperats de Firebase */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}
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
    height: 80,
    backgroundColor: '#c5bbbb',
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
    position: 'absolute', // Posiciona absolutament la barra inferior
    bottom: 0, // Ancorar a la part inferior
    left: 0,
    right: 0,
    backgroundColor: '#c5bbbb', // Fons blanc per la barra inferior
    borderTopWidth: 1, // Línia superior de la barra
    borderTopColor: '#ccc', // Color de la línia
  },
});