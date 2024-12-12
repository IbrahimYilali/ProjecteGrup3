import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';
import InfoCard from '../components/InfoCard';

export default function Add({ navigation }) {
  const [data, setData] = useState([
    {
      id: 1,
      Title: "Casa Milà",
      Description: "Modernist building by Antoni Gaudí.",
      Date: "01/07/2022",
      Location: "Barcelona, Spain",
      Latitude: 41.3953,
      Longitude: 2.1619,
      Likes: 0,
      Image_URL: '../assets/images/default_image.jpg',
    },
    {
      id: 2,
      Title: "Sagrada Família",
      Description: "Catholic basilica designed by Antoni Gaudí.",
      Date: "15/08/2022",
      Location: "Barcelona, Spain",
      Latitude: 41.4036,
      Longitude: 2.1744,
      Likes: 0,
      Image_URL: '../assets/images/default_image.jpg',
    },
    {
      id: 3,
      Title: "Park Güell",
      Description: "Public park with gardens and architectural elements by Gaudí.",
      Date: "20/09/2022",
      Location: "Barcelona, Spain",
      Latitude: 41.4145,
      Longitude: 2.1527,
      Likes: 0,
      Image_URL: '../assets/images/default_image.jpg',
    },
  ]);

  // Función para manejar el incremento de los "likes"
  const handleLikePress = (index) => {
    const updatedData = [...data];
    updatedData[index].Likes = (updatedData[index].Likes || 0) + 1; // Incrementar los likes
    setData(updatedData); // Actualizar el estado con los nuevos datos
  };

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <FSuperior 
          onPress={(id) => {
            if (id === 1) navigation.goBack(); // Volver atrás
            else if (id === 2) navigation.navigate("Home"); // Navegar a Home
          }} 
        />
      </View>

      {/* FlatList para mostrar las tarjetas de información */}
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={data} // Datos que estamos utilizando para renderizar los elementos
        renderItem={({ item, index }) => (
          <InfoCard 
            title={item.Title} // Título del lugar
            description={item.Description} // Descripción del lugar
            date={item.Date} // Fecha de creación
            location={item.Location} // Ubicación del lugar
            likes={item.Likes || 0} // Muestra los likes, por defecto 0
            imageUrl={item.Image_URL} // Imagen del lugar
            onPress={() => 
              navigation.navigate("Information", {
                title: item.Title,
                description: item.Description,
                location: item.Location,
                imageUrl: item.Image_URL,
                date: item.Date,
                initialLikes: item.Likes,
              })
            }
            onLocationPress={() => 
              navigation.navigate("Map", {
                latitude: item.Latitude, // Coordenadas para el mapa
                longitude: item.Longitude,
                locationName: item.Title, // Nombre del lugar
                description: item.Description, // Descripción específica
              })
            }
            onLikePress={() => handleLikePress(index)} // Llamar a la función para aumentar los likes
          />
        )}
        keyExtractor={item => item.id.toString()} // Establecer el identificador único de cada ítem
      />

      {/* Barra inferior */}
      <View style={styles.bottomBar}>
        <FSection 
          currentSection={3} // Esta es la sección actual: "Add"
          onPress={(id) => {
            if (id === 1) navigation.navigate("All"); // Navegar a la pantalla "All"
            else if (id === 2) navigation.navigate("Map"); // Navegar al mapa
            else if (id === 3) navigation.navigate("Add"); // Esta sección, "Add"
            else if (id === 4) navigation.navigate("Favorites"); // Navegar a favoritos
            else if (id === 5) navigation.navigate("Account"); // Navegar a cuenta
          }} 
        />
      </View>
    </View>
  );
}

// Estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fondo blanco
  },
  topBar: {
    backgroundColor: '#FFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    justifyContent: 'flex-end', // Alinear la barra superior hacia el final
  },
  listContainer: {
    paddingBottom: 100, // Espaciado extra en la parte inferior para la barra
    paddingTop: 10, // Espaciado en la parte superior
    paddingHorizontal: 16, // Relleno lateral
    alignItems: 'center', // Alinear los ítems al centro
  },
  bottomBar: {
    position: 'absolute', 
    bottom: 0, 
    left: 0,
    right: 0,
    height: 80,  // Altura de la barra inferior
    backgroundColor: '#FFF', 
    borderTopWidth: 1, 
    borderTopColor: '#ccc', 
  },
});
