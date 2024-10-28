// Vinculacio.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const Vinculacio = ({ route, navigation }) => {
  const { itemId } = route.params;  // ID del document a Firebase Firestore
  const [itemData, setItemData] = useState(null);

  // Funció per obtenir dades d'un document de Firestore
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const documentSnapshot = await firestore().collection('items').doc(itemId).get();
        if (documentSnapshot.exists) {
          setItemData(documentSnapshot.data());
        }
      } catch (error) {
        console.error('Error obtenint el document:', error);
      }
    };
    fetchItemData();
  }, [itemId]);

  if (!itemData) {
    return <Text>Carregant...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{itemData.title}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.date}>{itemData.date}</Text>
        <Text style={styles.description}>{itemData.description}</Text>
        
        <ScrollView horizontal style={styles.imageContainer}>
          {itemData.images && itemData.images.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={styles.image} />
          ))}
        </ScrollView>

        <View style={styles.iconBar}>
          <Icon name="home-outline" size={24} color="#333" style={styles.icon} />
          <Icon name="navigate-outline" size={24} color="#333" style={styles.icon} />
          <Icon name="heart-outline" size={24} color="#333" style={styles.icon} />
          <Icon name="share-outline" size={24} color="#333" style={styles.icon} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Vinculacio;

// Estils per la interfície
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ddd',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  icon: {
    padding: 10,
  },
});
