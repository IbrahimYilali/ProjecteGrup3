import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import { collection, getDocs } from 'firebase/firestore'; 
import db from '../Firebase/FirebaseConfig'; 
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';
import QuestionCell from '../components/QuestionCell'; 

export default function Add({ navigation }) {
  const [data, setData] = useState([]); 

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Preguntes'));
      const dataFromFirestore = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));
      console.log(dataFromFirestore); // Agregat per depuració
      setData(dataFromFirestore); 
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePress = (title) => {
    Alert.alert('Clicat', 'Has clicat a: ' + title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <FSuperior 
          onPress={(id) => {
            if (id === 1) navigation.goBack(); 
            else if (id === 2) navigation.navigate("Home");
          }} 
        />
      </View>

      {data.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text>No hi ha dades disponibles.</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <QuestionCell 
              title={item.Title} 
              longitude={item.Geolocation ? item.Geolocation.longitude : null} // Canviat a Geolocation
              latitude={item.Geolocation ? item.Geolocation.latitude : null} // Canviat a Geolocation
              imageUrl={item.Image_URL} // Canviat a Image_URL
              onPress={() => handlePress(item.Title)} // Passant el títol
            />
          )}
          keyExtractor={item => item.id}
        />
      )}

      <View style={styles.bottomBar}>
        <FSection 
          currentSection={3} 
          onPress={(id) => {
            if (id === 1) navigation.navigate("All"); 
            else if (id === 2) navigation.navigate("Map");
            else if (id === 3) navigation.navigate("Add"); 
            else if (id === 4) navigation.navigate("Favorites"); 
            else if (id === 5) navigation.navigate("Account"); 
          }} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', 
  },
  topBar: {
    height: 80, 
    backgroundColor: '#FFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    justifyContent: 'flex-end',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute', 
    bottom: 0, 
    left: 0,
    right: 0,
    height: 60, 
    backgroundColor: '#FFF', 
    borderTopWidth: 1, 
    borderTopColor: '#ccc', 
  },
});
