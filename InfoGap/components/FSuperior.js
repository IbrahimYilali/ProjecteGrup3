import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FSuperior = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress(1)}>
        <Icon name="arrow-back-outline" size={25} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Info Gap</Text>
      <TouchableOpacity onPress={() => onPress(2)}>
        <Icon name="search-outline" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FSuperior;
