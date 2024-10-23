import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assegura't que tens instal·lat 'expo-vector-icons'
import defaultImage from '../assets/images/default_image.jpg'; // Importa la imatge per defecte

const QuestionCell = ({ title, geolocations, imageUrl }) => {
  
  // Funció per gestionar el clic del botó
  const handlePress = () => {
    Alert.alert('Clicat', 'Això et porta a la fitxa pertinent.');
  };

  // Si la URL de la imatge no és vàlida, utilitza la imatge per defecte
  const imageSource = imageUrl ? { uri: imageUrl } : defaultImage;

  return (
    <View style={styles.questionCell}>
      {/* Imatge a l'esquerra ocupant el 35% */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="cover"/>
      </View>

      {/* Títol i coordenades a la dreta ocupant el 60% */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.coordinates}>Latitud: {geolocations.lat}</Text>
        <Text style={styles.coordinates}>Longitud: {geolocations.lon}</Text>
      </View>

      {/* Botó amb fletxa a la dreta ocupant el 5% */}
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Ionicons name="arrow-forward" size={24} color="blue" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  questionCell: {
    flexDirection: 'row', // Elements en fila
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    // Ombra per a iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Ombra per a Android
    elevation: 5,
  },
  imageContainer: {
    width: '35%', // Imatge ocupa el 35% de l'amplada
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ccc', // Fons gris clar mentre es carrega la imatge
  },
  textContainer: {
    width: '60%', // Text ocupa el 60% de l'amplada
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  coordinates: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    width: '5%', // Ocupa el 5% de l'espai
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: -5, // Mou la icona cap a l'esquerra
  },
});

export default QuestionCell;
