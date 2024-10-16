import React from 'react';
import { View, Text, Button } from 'react-native';
import FSection from '../components/FSection';


export default function All({  }) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Torna enrere"
        onPress={() => navigation.goBack()} 
      />
      <Button
        title="Torna a Home"
        onPress={() => navigation.popToTop()} 
      />
      <FSection/>
    </View>
  );
}