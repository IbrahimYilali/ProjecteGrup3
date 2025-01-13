import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, Button } from 'react-native';
import { getDocs, collection, query, orderBy, startAt, endAt } from 'firebase/firestore';
import FSection from '../components/FSection';  // Asegúrate de tener este componente
import FSuperior from '../components/FSuperior';  // Asegúrate de tener este componente
import InfoCard from '../components/InfoCard';  // Asegúrate de tener este componente
import db from '../Firebase/FirebaseConfig';  // Asegúrate de tener tu configuración de Firebase

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
                        imageUrl: data.Image_URL || null,  // Usando el campo correcto para la imagen
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
            {/* Barra superior */}
            <View style={styles.topBar}>
                <FSuperior
                    onPress={(id) => {
                        if (id === 1) navigation.goBack();
                    }}
                />
            </View>

            {/* Input de búsqueda */}
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            <Button title="Buscar" onPress={handleSearch} />

            {/* Mensaje de carga */}
            {loading && <Text style={styles.loadingText}>Cargando...</Text>}

            {/* Mostrar resultados de la búsqueda */}
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

            {/* Barra inferior de navegación */}
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
        backgroundColor: '#c5bbbb',
        borderBottomWidth: 1,
        borderBottomColor: '#c5bbbb',
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
});