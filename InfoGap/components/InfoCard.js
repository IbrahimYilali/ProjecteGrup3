import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

<<<<<<< Updated upstream
const InfoCard = ({ title, description, date, location, likes, imageUrl, onLikePress, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.location}>{location}</Text>
=======
const InfoCard = ({ title, description, date, location, likes, imageUrl, onLikePress, onPress, onLocationPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
        <Text style={styles.date}>{date}</Text>
        <TouchableOpacity onPress={onLocationPress}>
          <Text style={styles.location}>{location}</Text>
        </TouchableOpacity>
>>>>>>> Stashed changes
        <TouchableOpacity onPress={onLikePress}>
          <Text style={styles.likeText}>❤️ {likes} Likes</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  location: {
    fontSize: 12,
<<<<<<< Updated upstream
    color: 'gray',
=======
    color: 'blue', // Optional: make the location text look clickable
>>>>>>> Stashed changes
  },
  likeText: {
    fontSize: 14,
  },
});

export default InfoCard;
