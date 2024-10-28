import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, StyleSheet, Text } from 'react-native';
import { collection, getDocs } from 'firebase/firestore'; 
import db from '../Firebase/FirebaseConfig'; 
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';
import InfoCard from '../components/InfoCard';

export default function Add({ navigation }) {
  const [data, setData] = useState([]); 

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Preguntes'));
      const dataFromFirestore = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(dataFromFirestore); // For debugging
      setData(dataFromFirestore); 
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContainer} // Add this to ensure scrollability and spacing
          data={data}
          renderItem={({ item }) => (
            <InfoCard 
              title={item.Title} 
              description={item.Description}
              date={item.Date || "01/07/2022"} 
              location={item.Location || "Barcelona-Catalonia"} 
              likes={item.Likes || 14} 
              imageUrl={item.Image_URL || './assets/images/default.jpg'}
              onLikePress={() => Alert.alert("Liked", "You liked: " + item.Title)}
              onPress={() => 
                navigation.navigate("Information", {
                  title: item.Title,
                  description: item.Description,
                  location: item.Location || "Barcelona-Catalonia",
                  imageUrl: item.Image_URL || './assets/images/default.jpg',
                })
              }
<<<<<<< Updated upstream
=======
              onLocationPress={() => 
                navigation.navigate("LocationScreen", {
                  location: item.Location || "Barcelona-Catalonia",
                })
              }
>>>>>>> Stashed changes
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
  listContainer: {
    paddingBottom: 20, // Add bottom padding for scrollability
    paddingTop: 10, // Add top padding for separation
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
