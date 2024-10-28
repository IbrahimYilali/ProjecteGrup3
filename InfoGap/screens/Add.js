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

  const handleLikePress = (index) => {
    const updatedData = [...data];
    updatedData[index].Likes = (updatedData[index].Likes || 0) + 1; // Increment likes
    setData(updatedData);
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
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={data}
          renderItem={({ item, index }) => (
            <InfoCard 
              title={item.Title} 
              description={item.Description}
              date={item.Date || "01/07/2022"} 
              location={item.Location || "Barcelona-Catalonia"} 
              likes={item.Likes || 0} // Pass likes
              imageUrl={item.Image_URL || './assets/images/default_image.jpg'}
              onPress={() => 
                navigation.navigate("Information", {
                  title: item.Title,
                  description: item.Description,
                  location: item.Location || "Barcelona-Catalonia",
                  imageUrl: item.Image_URL || './assets/images/default_image.jpg',
                  date: item.Date || "01/07/2022",
                  initialLikes: item.Likes || 0,
                })
              }
              onLocationPress={() => 
                navigation.navigate("Map", {
                  location: item.Location || "Barcelona-Catalonia",
                })
              }
              onLikePress={() => handleLikePress(index)} // Handle likes
            />
          )}
          keyExtractor={item => item.id}
          // Important to give enough padding at the bottom for the scroll
          style={styles.flatList} 
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
    height: 100,  // Height of the top bar
    backgroundColor: '#FFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    justifyContent: 'flex-end',
    paddingTop: 20, // Space on top of the top bar
  },
  listContainer: {
    paddingBottom: 100, // Increase bottom padding to avoid obstruction from the bottom bar
    paddingTop: 10, // Add top padding for separation
    paddingHorizontal: 16, // Add horizontal padding for better spacing
    alignItems: 'center', // Center the cards
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flexGrow: 1, // Ensure that the FlatList can grow
  },
  bottomBar: {
    position: 'absolute', 
    bottom: 0, 
    left: 0,
    right: 0,
    height: 80,  // Height of the bottom bar
    backgroundColor: '#FFF', 
    borderTopWidth: 1, 
    borderTopColor: '#ccc', 
  },
});
