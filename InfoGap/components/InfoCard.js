import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const InfoCard = ({
  title = "Title",
  description = "Description goes here",
  date = "Date",
  location = "Location",
  likes = 0,
  imageUrl,
  onLikePress,
  onLocationPress,
}) => {
  const imageSource = imageUrl
  ? { uri: imageUrl }
  : require('../assets/images/default_image.jpg');

  return (
    <View style={styles.cardContainer}>
      {/* Contenedor del título */}
      <Text style={styles.title}>{title}</Text>
      
      {/* Contenedor de imagen y texto */}
      <View style={styles.rowContainer}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      {/* Footer con botones de like y ubicación debajo de la imagen */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton} onPress={onLikePress}>
          <Icon name="heart-outline" size={20} color="red" />
          <Text style={styles.likeText}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.locationButton} onPress={onLocationPress}>
          <Icon name="location-outline" size={20} color="red" />
          <Text style={styles.locationText}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.8,
    elevation: 5,
    marginHorizontal: 15,
  },
  rowContainer: {
    flexDirection: 'row', // Coloca la imagen y el texto en fila
    alignItems: 'flex-start',
    marginVertical: 10, // Espacio vertical entre el título y el contenido
  },
  image: {
    width: '40%', // Imagen ocupa el 40% del ancho del contenedor
    height: 120,
    borderRadius: 10,
    marginRight: 10, // Espacio entre imagen y contenedor de texto
  },
  textContainer: {
    width: '55%', // Contenedor de texto ocupa el 55% del ancho
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 7,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10, // Espacio entre el contenido y los botones
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    marginLeft: 5,
    fontSize: 14,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'red',
  },
});

export default InfoCard;
