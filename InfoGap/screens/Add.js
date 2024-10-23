// Add.js
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';
import QuestionCell from '../components/QuestionCell'; // Importa el component

export default function Add({ navigation }) {
  const geolocations1 = { lat: 41.3851, lon: 2.1734 };
  const geolocations2 = { lat: 48.8534, lon: 2.3486 }; 
  const Image_URL_1 = 'https://firebasestorage.googleapis.com/v0/b/test-c1325.appspot.com/o/barcelona-city-skyline-with-sagrada-familia-royalty-free-image-1692960079.jpg?alt=media&token=1de95662-070e-4d0c-870c-d12e2aca8e2f';
  const Image_URL_2 = 'https://firebasestorage.googleapis.com/v0/b/test-c1325.appspot.com/o/N2BB4ohwclor2uLoZ7XMHgJmxOZaMOokMdQqqXQAq3s.jpg?alt=media&token=8ee24ad5-865e-4809-8fe0-5875f71d8766'; // Exemple d'una altra imatge
  const Title1 = 'Localització BCN';
  const Title2 = 'Localització PARIS'; 

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <FSuperior 
          onPress={(id) => {
            if (id === 1) navigation.goBack(); 
            else if (id === 2) navigation.navigate("Home");
          }} 
        />
      </View>

      <ScrollView style={styles.content}>
        <QuestionCell 
          title={Title1} 
          geolocations={geolocations1} 
          imageUrl={Image_URL_1} 
        />
        <QuestionCell 
          title={Title2} 
          geolocations={geolocations2} 
          imageUrl={Image_URL_2} 
        />
      </ScrollView>

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

// Estils (del component Add)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  topBar: {
    height: 80,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
