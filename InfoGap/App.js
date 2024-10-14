import React from 'react';
import { StyleSheet, View, ImageBackground, Text, Image } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/images/Foto-Fondo.png')} // Tu imagen de fondo
        style={styles.background}
      >
        <View style={styles.overlay}>
          <Image source={require('./assets/images/logo.png')} style={styles.icon} />
          <Text style={styles.text}>Info Gap</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Esto asegura que la imagen cubra todo el fondo
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '45%', // Ajusta la posición según sea necesario
  },
  icon: {
    width: 80, // Ajusta el tamaño del icono
    height: 80,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#511C30', // Color similar al del texto de la imagen
    marginTop: 10,
  },
});

export default App;
