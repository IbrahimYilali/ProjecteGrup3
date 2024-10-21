import React from 'react';
import { View, StyleSheet } from 'react-native';
import FSection from '../components/FSection';

export default function Add({ navigation }) {
    
  return (
    <View style={styles.container}>
      {/* Aquí puedes añadir otros componentes, si deseas mostrar contenido adicional */}

      {/* Contenido principal */}
      <View style={styles.content}>
        {/* Puedes agregar otros elementos aquí */}
      </View>

      {/* Barra de navegación inferior */}
      <FSection 
        currentSection={3} 
        onPress={(id) => {
            if (id === 1) navigation.navigate("Home"); 
            else if (id === 2) navigation.navigate("Map");
            else if (id === 3) navigation.navigate("Add"); 
            else if (id === 4) navigation.navigate("Favorites"); 
            else if (id === 5) navigation.navigate("Account"); 
        }} 
      />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8', // Color de fondo de la pantalla
  },
  content: {
    flex: 1, // Ocupa el espacio restante
    justifyContent: 'center', // Centra el contenido
    alignItems: 'center', // Centra horizontalmente
  },
});
