import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FBSuperior from './FBSuperior'; // Componenet per als botons superiors

export default function FSuperior({ currentSection, onPress }) {
  return (
    <View style={styles.container}>
      <FBSuperior 
        selectedIcon="arrow-left-circle" 
        unselectedIcon="arrow-left-circle-outline" 
        id={1} 
        onPress={onPress} 
        isSelected={currentSection == 1} 
      />

      <Text style={styles.title}>InfoGap</Text>

      <FBSuperior 
        selectedIcon="magnify" 
        unselectedIcon="magnify" 
        id={2} 
        onPress={onPress} 
        isSelected={currentSection == 2} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: 'white',
      height: 65,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      marginHorizontal: 50, // Afegir espai horitzontal al voltant del títol
    },
    iconContainer: {
      paddingTop: 2,
      marginHorizontal: 30, // Afegir espai horitzontal entre les icones
    },
  });
  
  
  
  
  
