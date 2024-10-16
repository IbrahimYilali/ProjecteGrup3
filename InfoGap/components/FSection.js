import React from 'react';
import { View, Text, Button} from 'react-native';
import FButton from './FButton';

export default function FSection({ currentSection, onPress }) {
    
    
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', 
                    flexDirection:'row' }}>
        <FButton selectedIcon="home" unselectedIcon="home-outline" id={1} 
        onPress={onPress} isSelected={currentSection==1}/>
        
        <FButton selectedIcon="map" unselectedIcon="map-outline" id={2} 
        onPress={onPress} isSelected={currentSection==2}/>
        
        <FButton selectedIcon="account" unselectedIcon="account-outline" id={3} 
        onPress={onPress} isSelected={currentSection==3}/>
      
    </View>
  );
}
