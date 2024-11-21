import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InfoCard = ({
  title,
  description,
  date,
  location,
  likes,
  imageUrl,
  onPress,
  onLocationPress,
  onLikePress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <Text style={styles.date}>{date}</Text>
        <TouchableOpacity onPress={onLocationPress} style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="red" />
          <Text style={styles.location}>{location}</Text>
        </TouchableOpacity>
        <View style={styles.likesContainer}>
          <TouchableOpacity onPress={onLikePress} style={styles.likeButton}>
            <Ionicons name="heart" size={20} color="red" />
            <Text style={styles.likeText}>{likes} </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
    overflow: 'hidden',
    maxWidth: '100%', // Reduce the width of the card
    alignSelf: 'left', // Center the card
  },
  image: {
    width: '100%',
    height: 100, // Reduced height
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    marginBottom: 8,
  },
  date: {
    fontSize: 10,
    color: 'gray',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 4,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    marginTop: 4,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  likeText: {
    marginLeft: 4,
    fontSize: 12,
  },
});

export default InfoCard;
