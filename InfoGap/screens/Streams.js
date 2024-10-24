import React from 'react';
import { View, StyleSheet } from 'react-native';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior'; // Assegura't que FSuperior estigui importat correctament

export default function Streams({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Barra de navegació superior */}
      <View style={styles.topBar}>
        <FSuperior 
          onPress={(id) => {
            if (id === 1) navigation.goBack(); 
            else if (id === 2) navigation.navigate("Filters");
          }} 
        />
      </View>

      {/* Barra de navegació inferior */}
      <View style={styles.bottomBar}>
        <FSection 
          currentSection={1} 
          onPress={(id) => {
            if (id === 1) navigation.navigate("All"); 
            else if (id === 2) navigation.navigate("Map");
            else if (id === 3) navigation.navigate("Favorites"); 
            else if (id === 4) navigation.navigate("Add"); 
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
    paddingBottom: 0, // Espai inferior per a millor visualització
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
