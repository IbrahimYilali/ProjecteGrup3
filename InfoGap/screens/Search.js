import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import FSection from '../components/FSection'; // Make sure this is a simple navigation component
import FSuperior from '../components/FSuperior'; // Make sure this is a simple top bar component

export default function Search({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Add your search logic here if needed
        console.log("Searching for: ", query);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <FSuperior 
                    onPress={(id) => {
                        if (id === 1) navigation.goBack(); // Go back if that's what FSuperior is for
                        // Add other navigation options as needed
                    }} 
                />
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* You can display search results here if you have any */}

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
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
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
