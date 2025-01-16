import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, Button, Modal, TouchableOpacity } from 'react-native';
import { getDocs, collection, query, orderBy, startAt, endAt } from 'firebase/firestore';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';
import InfoCard from '../components/InfoCard';
import { db, auth } from '../Firebase/FirebaseConfig';

export default function Search({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const availableFilters = {
        '1. Monuments': 1,
        '2. Best/Best dishes': 2,
        '3. Car / CarMeets': 3,
        '4. ECO routes': 4,
        '5. Viewpoints': 5,
        '6. Couples': 6,
        '7. Parties/Discos': 7,
        '8. Gyms': 8,
    };

    const handleSearch = async () => {
        const trimmedQuery = searchQuery.trim();

        if (trimmedQuery.length === 0) {
            setResults([]);
            return;
        }

        setLoading(true);

        try {
            const searchQueryCapitalized = trimmedQuery.charAt(0).toUpperCase() + trimmedQuery.slice(1);
            let q = query(
                collection(db, 'Preguntes'),
                orderBy('Title'),
                startAt(searchQueryCapitalized),
                endAt(searchQueryCapitalized + '\uf8ff')
            );

            const querySnapshot = await getDocs(q);

            const filteredResults = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(doc => {
                    if (selectedFilters.length === 0) return true;
                    return selectedFilters.some(filter => doc.Type === availableFilters[filter]);
                });

            setResults(filteredResults);
        } catch (error) {
            console.error("Error retrieving data: ", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const applyFilters = () => {
        setIsModalVisible(false);
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

            {/* Search and filter button container */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
                <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
                    <Text style={styles.filterButtonText}>⚙</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>

            {/* Display selected filters */}
            {selectedFilters.length > 0 && (
                <View style={styles.selectedFiltersContainer}>
                    <Text style={styles.selectedFiltersText}>
                        Filters: {selectedFilters.join(', ')}
                    </Text>
                </View>
            )}

            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Multiple filters selection</Text>
                    {Object.keys(availableFilters).map((filter, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.filterOption,
                                selectedFilters.includes(filter) && styles.filterOptionSelected,
                            ]}
                            onPress={() => {
                                if (selectedFilters.includes(filter)) {
                                    setSelectedFilters(selectedFilters.filter(f => f !== filter));
                                } else {
                                    setSelectedFilters([...selectedFilters, filter]);
                                }
                            }}
                        >
                            <Text style={styles.filterText}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity 
                    onPress={applyFilters} 
                    style={[styles.applyButton]}>
                    <Text style={styles.applyButtonText}>Apply Filters</Text>
                    </TouchableOpacity>

                </View>
            </Modal>

            {loading && <Text style={styles.loadingText}>Loading...</Text>}

            {results.length > 0 ? (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <InfoCard
                            title={item.Title}
                            description={item.Description}
                            date={item.Date}
                            location={item.Location || 'Barcelona-Catalonia'}
                            likes={item.Likes}
                            imageUrl={item.Image_URL}
                            geolocation={item.Geolocation}
                            onLikePress={() => console.log(`Liked: ${item.Title}`)}
                            onLocationPress={() => console.log(`Location: ${item.Location}`)}
                        />
                    )}
                />
            ) : (
                !loading && <Text style={styles.noResultsText}>No results found.</Text>
            )}

            <View style={styles.bottomBar}>
                <FSection 
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#EEE',
        borderRadius: 25,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: '#000',
    },
    filterButton: {
        marginLeft: 5,
        padding: 10,
        backgroundColor: '#CCC',
        borderRadius: 20,
    },
    filterButtonText: {
        fontSize: 16,
        color: '#000',
    },
    searchButton: {
        marginLeft: 5,
        padding: 10,
        backgroundColor: '#DDD',
        borderRadius: 20,
    },
    searchButtonText: {
        fontSize: 16,
        color: '#000',
    },
    selectedFiltersContainer: {
        marginHorizontal: 10,
        marginBottom: 5,
    },
    selectedFiltersText: {
        fontSize: 14,
        color: '#555',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
        color: '#FFF',
    },
    filterOption: {
        padding: 10,
        backgroundColor: '#FFF',
        marginVertical: 5,
        width: '80%',
        alignItems: 'center',
        borderRadius: 5,
    },
    filterOptionSelected: {
        backgroundColor: '#AAA',
    },
    filterText: {
        color: '#000',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        padding: 10,
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
        backgroundColor: '#c5bbbb',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    applyButton: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    applyButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },    
});
