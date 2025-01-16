import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const InfoCard = ({
  title = "Title",
  description = "Description goes here",
  date = "Date",
  location = "Location",
  initialLikes = 0,
  imageUrl,
  geolocation,
  onLocationPress,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  // Verificar si la URL de la imagen es válida (en caso de que no lo sea, usa la imagen local)
  const isValidImageUrl = imageUrl && imageUrl.startsWith('http');

  const imageSource = isValidImageUrl
    ? { uri: imageUrl }
    : require('../assets/images/default_image.jpg'); // Usa una imagen local si la URL no es válida

  // Manejar el evento de presionar el botón de "like"
  const handleLikePress = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

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
        <TouchableOpacity style={styles.likeButton} onPress={handleLikePress}>
          <Icon 
            name={isLiked ? "heart" : "heart-outline"} 
            size={20} 
            color={isLiked ? "red" : "gray"} 
          />
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  image: {
    width: '40%',
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    width: '55%',
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
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
