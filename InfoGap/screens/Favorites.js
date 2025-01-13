import React from 'react';
import { View, StyleSheet } from 'react-native';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior'; // Asegúrate de que FSuperior esté importado correctamente

export default function Favorites({ navigation }) {
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

      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <FSection
          currentSection={4}
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
    backgroundColor: '#f4f4f4', // Fondo blanco
  },
  topBar: {
    height: 80,
    backgroundColor: '#c5bbbb',
    borderBottomWidth: 1,
    borderBottomColor: '#c5bbbb',
    justifyContent: 'flex-end',
  },
  bottomBar: {
    position: 'absolute', // Posiciona absolutamente la barra inferior
    bottom: 0, // Ancla a la parte inferior
    left: 0,
    right: 0,
    backgroundColor: '#c5bbbb', // Fondo blanco para la barra inferior
    borderTopWidth: 1, // Línea superior de la barra
    borderTopColor: '#ccc', // Color de la línea
  },
});
