import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';

// Importa la imatge de fons
const backgroundImage = require('../assets/images/fondo.png'); // Ajusta el camí a la imatge

export default function Page2({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Les contrasenyes no coincideixen!");
      return;
    }

    // Aquí podries agregar la lògica de registre
    console.log('Email:', email);
    console.log('Password:', password);
    // Missatge d'inscripció
    alert('Inscripció realitzada');
    // Redirigeix a una altra pàgina si és necessari
    // navigation.navigate('Algun altra pantalla');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.signupBox}>
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
            secureTextEntry // Amaga la contrasenya
          />

          <TextInput
            style={styles.input}
            placeholder="Repetir contrasenya"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry // Amaga la contrasenya
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Sign Up"
              onPress={handleSignUp}
              color="black" // Color del text del botó
            />
            <Button
              title="Torna enrere"
              onPress={() => navigation.goBack()}
              color="black" // Color del text del botó
            />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', // Color del text del títol ajustat a negre
    textAlign: 'center', // Centra el títol
  },
  signupBox: {
    backgroundColor: '#fff', // Color de fons del recuadre
    borderRadius: 10, // Arrodoniment de les cantonades
    padding: 40, // Espai interior
    width: '90%', // Amplada del recuadre ajustada
    elevation: 5, // Ombra per a Android
    shadowColor: '#000', // Ombra per a iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20, // Espai entre els inputs i els botons
    width: '100%', // Amplada dels botons ajustada
    alignItems: 'center', // Centra els botons horitzontalment
  },
});
