<<<<<<< Updated upstream
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior'; // Assegura't que FSuperior estigui importat correctament

export default function All({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Barra de navegació superior */}
      <View style={styles.topBar}>
        <FSuperior 
          onPress={(id) => {
            if (id === 1) navigation.goBack(); 
            else if (id === 2) navigation.navigate("Home");
          }} 
        />
      </View>

      {/* Barra de navegació inferior */}
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
=======
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, Button, Image } from 'react-native';
import { getDocs, collection, query, orderBy, startAt, endAt } from 'firebase/firestore';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';
import InfoCard from '../components/InfoCard';
import db from '../Firebase/FirebaseConfig';

export default function Search({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Función para manejar la búsqueda al presionar el botón
    const handleSearch = async () => {
        if (searchQuery.trim().length >= 1) {
            setLoading(true);
            try {
                const q = query(
                    collection(db, 'Preguntes'),
                    orderBy('Title'),
                    startAt(searchQuery),
                    endAt(searchQuery + '\uf8ff')
                );

                const querySnapshot = await getDocs(q);
                
                if (querySnapshot.empty) {
                    console.log("No hay resultados para la búsqueda");
                    setResults([]);
                    setLoading(false);
                    return;
                }

                const cardsFromFirestore = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    console.log('Data del documento:', data);  // Para depurar

                    return {
                        id: doc.id,
                        title: data.Title || "Sin título",
                        description: data.Description || "Sin descripción",
                        date: data.Date || "Sin fecha",
                        location: data.Location || "Sin ubicación",
                        likes: data.Likes || 0,
                        imageUrl: data.Imagen_URL || null,  // Usando el campo correcto para la imagen
                        geolocation: data.Geolocation || null,  // Usando el campo correcto para la geolocalización
                    };
                });

                setResults(cardsFromFirestore);
            } catch (error) {
                console.error("Error al obtener los datos: ", error);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <FSuperior 
                    onPress={(id) => {
                        if (id === 1) navigation.goBack();
                    }} 
                />
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <Button title="Buscar" onPress={handleSearch} />

            {loading && <Text style={styles.loadingText}>Cargando...</Text>}

            {results.length > 0 ? (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <InfoCard
                            title={item.title}
                            description={item.description}
                            date={item.date}
                            location={item.location}
                            likes={item.likes}
                            imageUrl={item.imageUrl}  // Se pasa la URL de la imagen
                            geolocation={item.geolocation}  // Se pasa la geolocalización
                            onLikePress={() => console.log(`Liked: ${item.title}`)}
                            onLocationPress={() => console.log(`Location: ${item.location}`)}
                        />
                    )}
                />
            ) : (
                <Text style={styles.noResultsText}>No se encontraron resultados.</Text>
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
>>>>>>> Stashed changes
}

// Estils
const styles = StyleSheet.create({
<<<<<<< Updated upstream
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Fons blanc
  },
  topBar: {
    height: 80, // Alçada de la barra superior
    backgroundColor: '#FFF', // Fons blanc
    borderBottomWidth: 1, // Línia inferior de la barra
    borderBottomColor: '#ccc', // Color de la línia
    justifyContent: 'flex-end', // Alinea el contingut a la part inferior
    paddingBottom: 0, // Espai inferior per a millor visualització
  },
  bottomBar: {
    position: 'absolute', // Posiciona absolutament la barra inferior
    bottom: 0, // Ancorar a la part inferior
    left: 0,
    right: 0,
    height: 60, // Alçada de la barra inferior
    backgroundColor: '#FFF', // Fons blanc per la barra inferior
    borderTopWidth: 1, // Línia superior de la barra
    borderTopColor: '#ccc', // Color de la línia
  },
=======
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
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        padding: 10,
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    noResultsText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        padding: 10,
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
>>>>>>> Stashed changes
});
