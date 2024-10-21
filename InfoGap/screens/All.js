import React from 'react';
import { View, StyleSheet } from 'react-native';
import FSection from '../components/FSection';

export default function All({ navigation }) {
    
  return (
    <View style={styles.container}>
      {/* Contingut principal */}
      <View style={styles.content}>
        {/* Pots afegir altres elements aquí */}
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
  content: {
    flex: 1, // Ocupa l'espai restant
    justifyContent: 'center', // Centra el contingut verticalment
    alignItems: 'center', // Centra el contingut horitzontalment
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
