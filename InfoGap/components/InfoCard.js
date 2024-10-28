// InfoCard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InfoCard = ({ title, description, date, location, initialLikes, imageUrl, onPress }) => {
  const [likes, setLikes] = useState(initialLikes); // State for likes

  const handleLikePress = () => {
    setLikes(likes + 1); // Increment likes
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{date}</Text>
      </TouchableOpacity>
      <View style={styles.likesContainer}>
        <TouchableOpacity onPress={handleLikePress} style={styles.likeButton}>
          <Ionicons name="heart" size={24} color="red" />
          <Text style={styles.likeText}>{likes} Likes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={16} color="red" />
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    elevation: 1, // Add shadow
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 4,
  },
});

export default InfoCard;
