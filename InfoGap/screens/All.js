import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';
import InfoCard from '../components/InfoCard';

export default function All({ navigation }) {
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
            else if (id === 2) navigation.navigate("Search");
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
          currentSection={1}
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
    backgroundColor: '#f4f4f4',
  },
  topBar: {
    height: 80,
    backgroundColor: '#c5bbbb',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'flex-end',
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
    position: 'absolute', // Posiciona absolutament la barra inferior
    bottom: 0, // Ancorar a la part inferior
    left: 0,
    right: 0,
    backgroundColor: '#c5bbbb', // Fons blanc per la barra inferior
    borderTopWidth: 1, // Línia superior de la barra
    borderTopColor: '#ccc', // Color de la línia
  },
});
