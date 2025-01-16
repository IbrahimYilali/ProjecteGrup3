import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, Button } from 'react-native';
import { getDocs, collection, query, orderBy, startAt, endAt } from 'firebase/firestore';
import FSection from '../components/FSection'; // Asegúrate de tener este componente
import FSuperior from '../components/FSuperior'; // Asegúrate de tener este componente
import InfoCard from '../components/InfoCard'; // Asegúrate de tener este componente
import { db, auth } from '../Firebase/FirebaseConfig'; // Asegúrate de configurar correctamente Firebase

export default function Search({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Función para manejar la búsqueda
    const handleSearch = async () => {
        const trimmedQuery = searchQuery.trim();

        if (trimmedQuery.length === 0) {
            setResults([]);
            return;
        }

        setLoading(true);

        try {
            const searchQuery = trimmedQuery.charAt(0).toUpperCase() + trimmedQuery.slice(1); // Capitaliza la primera letra para búsquedas más precisas
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
            } else {
                const cardsFromFirestore = querySnapshot.docs.map(doc => {
                    const data = doc.data();

                    return {
                        id: doc.id,
                        title: data.Title || "Sin título",
                        description: data.Description || "Sin descripción",
                        date: data.Date || "Sin fecha",
                        location: data.Location || "Sin ubicación",
                        likes: data.Likes || 0,
                        imageUrl: data.Image_URL || null,
                        geolocation: data.Geolocation || null,
                    };
                });

                setResults(cardsFromFirestore);
            }
        } catch (error) {
            console.error("Error al obtener los datos: ", error);
        } finally {
            setLoading(false);
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
                            imageUrl={item.imageUrl}
                            geolocation={item.geolocation}
                            onLikePress={() => console.log(`Liked: ${item.title}`)}
                            onLocationPress={() => console.log(`Location: ${item.location}`)}
                        />
                    )}
                />
            ) : (
                !loading && <Text style={styles.noResultsText}>No se encontraron resultados.</Text>
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
        position: 'absolute', // Posiciona absolutament la barra inferior
        bottom: 0, // Ancorar a la part inferior
        left: 0,
        right: 0,
        backgroundColor: '#c5bbbb', // Fons blanc per la barra inferior
        borderTopWidth: 1, // Línia superior de la barra
        borderTopColor: '#ccc', // Color de la línia
    },
});
