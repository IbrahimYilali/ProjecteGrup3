import React from 'react';
import { View, Image, Button, ImageBackground, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/images/fondo.png')} // Assegura't que la ruta és correcta
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Imatge del logo al centre de la pantalla */}
        <Image
          source={require('../assets/images/logo.png')} // Assegura't que la ruta és correcta
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Botons a la part inferior de la pantalla */}
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Login"
            color="white" // Color del text del botó
            onPress={() => navigation.navigate('Page1')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Sign Up"
            color="white" // Color del text del botó
            onPress={() => navigation.navigate('Details')}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

// Estils per al component
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between', // Col·loca el contingut de manera espaiada
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Centra la imatge verticalment
    alignItems: 'center', // Centra la imatge horitzontalment
  },
  logo: {
    width: 150, // Amplada de la imatge del logo (ajusta com sigui necessari)
    height: 150, // Alçada de la imatge del logo (ajusta com sigui necessari)
  },
  buttonContainer: {
    marginBottom: 50, // Margen inferior per allunyar els botons de la part inferior
    width: '80%', // Amplada del contenidor dels botons
    alignSelf: 'center', // Centra el contenidor horitzontalment
  },
  button: {
    marginVertical: 10, // Espai entre botons
    borderRadius: 10, // Arrodoniment dels racons
    overflow: 'hidden', // Amaga les parts que sobresurten
    backgroundColor: 'black', // Color de fons dels botons
  },
});
