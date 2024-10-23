import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';
import QuestionCell from '../components/QuestionCell'; 

export default function Add({ navigation }) {

  // Dades per a les cel·les de pregunta
  const questionsData = [
    {
      id: '1',
      title: 'Localització BCN',
      geolocations: { lat: 41.3851, lon: 2.1734 },
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/test-c1325.appspot.com/o/barcelona-city-skyline-with-sagrada-familia-royalty-free-image-1692960079.jpg?alt=media&token=1de95662-070e-4d0c-870c-d12e2aca8e2f',
    },
    {
      id: '2',
      title: 'Localització PARIS',
      geolocations: { lat: 48.8534, lon: 2.3486 },
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/test-c1325.appspot.com/o/N2BB4ohwclor2uLoZ7XMHgJmxOZaMOokMdQqqXQAq3s.jpg?alt=media&token=8ee24ad5-865e-4809-8fe0-5875f71d8766',
    },
    {
      id: '3',
      title: 'Localització TOKYO',
      geolocations: { lat: 35.6895000, lon: 139.6917100 },
      imageUrl: '',
    },
    // Afegeix més dades aquí si és necessari
  ];

  return (
    <View style={styles.container}>
      
      {/* Barra de navegació superior */}
      <View style={styles.topBar}>
        <FSuperior 
          onPress={(id) => {
            if (id === 1) navigation.goBack(); 
            else if (id === 2) navigation.navigate("Home");
          }} 
        />
      </View>

      {/* Contingut principal amb el FlatList */}
      <FlatList
        data={questionsData}
        renderItem={({ item }) => (
          <QuestionCell 
            title={item.title} 
            geolocations={item.geolocations} 
            imageUrl={item.imageUrl} 
            onPress={() => Alert.alert('Clicat a ' + item.title)} // Mostrar alert quan es fa clic al botó
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
      />

      {/* Barra de navegació inferior */}
      <View style={styles.bottomBar}>
        <FSection 
          currentSection={3} 
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

// Estils
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fons blanc
  },
  topBar: {
    height: 80, // Alçada de la barra superior
    backgroundColor: '#FFF', // Fons blanc
    borderBottomWidth: 1, // Línia inferior de la barra
    borderBottomColor: '#ccc', // Color de la línia
    justifyContent: 'flex-end', // Alinea el contingut a la part inferior
  },
  content: {
    padding: 20,
  },
  bottomBar: {
    position: 'absolute', // Posiciona absolutament la barra inferior
    bottom: 0, // Ancorar a la part inferior
    left: 0,
    right: 0,
    height: 60, // Alçada de la barra inferior
    backgroundColor: '#FFF', // Fons blanc per la barra inferior
    borderTopWidth: 1, // Línia superior de la barra
    borderTopColor: '#ccc', // Color de la línia
  },
});
