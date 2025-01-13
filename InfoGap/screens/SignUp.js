import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import FSection from '../components/FSection';
import { auth, db } from '../Firebase/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const backgroundImage = require('../assets/fondo.png');

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (password === confirmPassword) {
            try {
                // Crear cuenta en Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Guardar el usuario en Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    createdAt: new Date(),
                });

                // Redirigir al usuario a la pantalla de inicio
                navigation.navigate('All');
            } catch (error) {
                console.log('Error al crear cuenta:', error.message);
                Alert.alert('Error', error.message);
            }
        } else {
            alert('Passwords do not match');
        }
    };

    const handlePress = (id) => {
        console.log("Han clickat el botó.");
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.loginBox}>
                {/* Botons a sobre del títol */}
                <View style={styles.topButtons}>
                    <TouchableOpacity
                        style={styles.switchButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.switchButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.switchButton, { backgroundColor: '#333' }]}
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={styles.switchButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Títol */}
                <Text style={styles.title}>Welcome to Info Gap!</Text>

                {/* Inputs */}
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

                <TextInput
                    style={styles.input}
                    placeholder="Repeat Password..."
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    secureTextEntry
                    placeholderTextColor="#aaa"
                />

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <FSection currentSection={3} onPress={handlePress} />
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
    topButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Deixa espai entre els botons
        width: '100%',
        marginBottom: 20,
    },
    switchButton: {
        backgroundColor: '#aaa',
        borderRadius: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        flex: 1, 
        alignItems: 'center',
    },

    switchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
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
});
