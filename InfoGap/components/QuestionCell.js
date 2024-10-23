import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener instalado react-native-vector-icons

const QuestionCell = ({ imageUrl, title, latitude, longitude, onPress }) => {
  
  // Si no hay imageUrl, usar imagen por defecto
  const imageSource = imageUrl
    ? { uri: imageUrl }
    : require('../assets/images/default_image.jpg'); // Ruta a tu imagen por defecto

  return (
    <View style={styles.questionCell}>
      {/* Imagen ocupa el 35% del ancho */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>

      {/* Contenedor de texto para el título y coordenadas ocupa el 60% */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.coordinates}>
          Lat: {latitude !== null ? latitude : 'N/A'}, Lon: {longitude !== null ? longitude : 'N/A'}
        </Text>
      </View>

      {/* Botón ocupa el 5% del ancho con icono de ir a detalles */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  questionCell: {
    flexDirection: 'row', // Elementos en fila
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Sombra para Android
    elevation: 5,
  },
  imageContainer: {
    width: '35%', // Imagen ocupa el 35% del ancho
    marginRight: 10, // Espacio entre la imagen y el texto
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ccc', // Fondo gris claro mientras se carga la imagen
  },
  textContainer: {
    width: '60%', // Texto ocupa el 60% del ancho
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  coordinates: {
    fontSize: 16,
    color: '#666', // Color gris para las coordenadas
  },
  button: {
    width: '5%', // Ocupa el 5% del espacio
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuestionCell;
