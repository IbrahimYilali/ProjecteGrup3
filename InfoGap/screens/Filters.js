
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const FILTER_OPTIONS = [
  { id: '1', label: 'All' },
  { id: '2', label: 'CouplesRomantic' },
  { id: '3', label: 'CarCarMeets' },
  { id: '4', label: 'ECOroutes' },
  { id: '5', label: 'Monuments' },
  { id: '6', label: 'PartiesDiscos' },
  { id: '7', label: 'Toprateddishes' },
  { id: '8', label: 'Streams' },
  { id: '9', label: 'Viewpoints' },
];

export default function Filters() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const navigation = useNavigation();

  const handleFilterSelect = (item) => {
    setSelectedFilter(item.id);
    navigation.navigate(item.label.replace(/\s+/g, '')); // Navegar a la pantalla correspondiente
  };

  const renderFilterItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        selectedFilter === item.id && styles.selectedFilterItem,
      ]}
      onPress={() => handleFilterSelect(item)}
    >
      <Text style={styles.filterLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters</Text>
      <FlatList
        data={FILTER_OPTIONS}
        renderItem={renderFilterItem}
        keyExtractor={(item) => item.id}
        extraData={selectedFilter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  filterItem: {
    padding: 15,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  selectedFilterItem: {
    backgroundColor: '#f0f0f0',
    borderColor: '#007bff',
    borderWidth: 2,
  },
  filterLabel: {
    fontSize: 18,
  },
});
