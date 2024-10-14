import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';

// Importa la imatge de fons
const backgroundImage = require('../assets/images/fondo.png');

export default function Page2({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    alert('Registre realitzat');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.signUpBox}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Correu electrònic"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Contrasenya"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirma la contrasenya"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <Button title="Sign Up" onPress={handleSignUp} color="#ffffff" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Torna enrere" onPress={() => navigation.goBack()} color="#ffffff" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

// Estils per al component
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  signUpBox: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 40,
    width: '90%', // Ampliar el recuadre
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'black', // Color de fons negre per als botons
    marginBottom: 10, // Espai entre botons
  },
});
