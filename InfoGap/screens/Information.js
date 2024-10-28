import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Information = ({ route, navigation }) => {
  const { title, description, location, imageUrl, date, initialLikes } = route.params;
  const [likes, setLikes] = useState(initialLikes); // State for likes

  const handleLikePress = () => {
    setLikes(likes + 1); // Increment likes
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color="black" 
          onPress={() => navigation.goBack()} // Navigate back when the icon is pressed
        />
        <Text style={styles.title}>{title}</Text>
      </View>

      <Image source={{ uri: imageUrl }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{date || "01/07/2022"}</Text>
        
        <View style={styles.likesContainer}>
          <TouchableOpacity onPress={handleLikePress} style={styles.likeButton}>
            <Ionicons name="heart" size={24} color="red" />
            <Text style={styles.likeText}>{likes} Likes</Text> {/* Use 'likes' state instead of 'item.Likes' */}
          </TouchableOpacity>
        </View>

        {/* Display the location with an icon */}
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="red" />
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    flex: 1, // Allow title to take available space
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 1, // Add some elevation for shadow effect
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    marginLeft: 8,
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 4, // Added some spacing between the icon and the text
  },
});

export default Information;
