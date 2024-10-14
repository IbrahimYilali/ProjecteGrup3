import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function Page1({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí podrías agregar la lógica de autenticación
    console.log('Email:', email);
    console.log('Password:', password);
    // Por ejemplo, podrías mostrar una alerta o navegar a otra página
    alert('Inici de sessió realitzat'); // Missatge d'inici de sessió
    // Redirigeix a una altra pàgina si és necessari
    // navigation.navigate('Algun altra pantalla');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inici de sessió</Text>

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

      <Button
        title="Iniciar Sessió"
        onPress={handleLogin}
      />

      <Button
        title="Torna enrere"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

// Estils per al component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Espai interior
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
});
