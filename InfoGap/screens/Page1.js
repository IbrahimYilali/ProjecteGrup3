import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const backgroundImage = require('../assets/images/fondo.png');

export default function Page1({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí se puede agregar la lógica de autenticación
    alert(`Login successful for email: ${email}`);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.loginBox}>
        
        <View style={styles.topButtons}>
          <TouchableOpacity
            style={[styles.switchButton, { backgroundColor: '#333' }]}
            onPress={() => navigation.navigate('Page1')}
          >
            <Text style={styles.switchButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => navigation.navigate('Page2')}
          >
            <Text style={styles.switchButtonText}>Sign Up</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.title}>Welcome to Info Gap!</Text>

        <TextInput
          style={styles.input}
          placeholder="User..."
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Password..."
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButtons: {
    flexDirection: 'row',
    position: 'absolute',
    top: 40,
    justifyContent: 'space-around',
    width: '80%',
  },
  switchButton: {
    backgroundColor: '#aaa',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  switchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#999',
    marginTop: 10,
  },
});
