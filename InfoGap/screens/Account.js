import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Importem la llibreria d'Expo per seleccionar imatges
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';
import { signOut } from 'firebase/auth'; // Importar signOut
import { auth } from '../Firebase/FirebaseConfig'; // Asegúrate de importar correctamente Firebase

export default function Account({ navigation }) {
  const [username] = useState("User1");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4], // Si vols retallar la imatge després de seleccionar-la
      quality: 1, // Qualitat màxima
    });

    if (!result.cancelled) {
      setProfileImage(result.uri); // Guardem el camí de la imatge seleccionada
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);  // Cierra la sesión del usuario
      navigation.navigate('Login');  // Redirige a la pantalla de Login
    } catch (error) {
      console.log('Error al cerrar sesión:', error.message);
      alert('Error al cerrar sesión');
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra de navegació superior */}
      <View style={styles.topBar}>
        <FSuperior
          onPress={(id) => {
            if (id === 1) navigation.goBack();
            else if (id === 2) navigation.navigate("Search");
          }}
        />
      </View>

      {/* Secció de configuració amb recuadro */}
      <View style={styles.settingsContainer}>
        <View style={styles.box}>
          {/* Foto de perfil i canvi */}
          <View style={styles.profileContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Text style={styles.photoText}>👤</Text>
            )}
            <TouchableOpacity style={styles.changeButton} onPress={handleImagePicker}>
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* Nom d'usuari (inmodificable) */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Username</Text>
            <Text style={styles.usernameText}>{username}</Text>
          </View>

          {/* Contrassenya amb funcionalitat de mostrar/ocultar */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Password</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Write here."
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
              <Text style={styles.toggleButtonText}>
                {isPasswordVisible ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Descripció */}
          <Text style={styles.descriptionTitle}>Description</Text>
          <TextInput
            style={styles.inputDescription}
            placeholder="Write here."
            multiline={true}
          />
        </View>

        {/* Botó de tancar sessió */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de navegació inferior */}
      <View style={styles.bottomBar}>
        <FSection
          currentSection={5}
          onPress={(id) => {
            if (id === 1) navigation.navigate("All");
            else if (id === 2) navigation.navigate("Map");
            else if (id === 3) navigation.navigate("Add");
            else if (id === 4) navigation.navigate("Favorites");
            else if (id === 5) navigation.navigate("Account");
          }}
        />
      </View>
    </View>
  );
}

// Estils
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  topBar: {
    height: 80,
    backgroundColor: '#c5bbbb',
    borderBottomWidth: 1,
    borderBottomColor: '#c5bbbb',
    justifyContent: 'flex-end',
  },
  bottomBar: {
    position: 'absolute', // Posiciona absolutament la barra inferior
    bottom: 0, // Ancorar a la part inferior
    left: 0,
    right: 0,
    backgroundColor: '#c5bbbb', // Fons blanc per la barra inferior
    borderTopWidth: 1, // Línia superior de la barra
    borderTopColor: '#ccc', // Color de la línia
  },
  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  box: {
    backgroundColor: '#E5E5E5',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    width: '90%',
    maxWidth: 400,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  photoText: {
    fontSize: 40,
    marginRight: 10,
  },
  changeButton: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  changeButtonText: {
    color: '#6A6A6A',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  fieldLabel: {
    width: 90,
    fontSize: 16,
    fontWeight: 'bold',
  },
  usernameText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
  },
  inputField: {
    flex: 1,
    height: 40,
    borderColor: '#B0B0B0',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  toggleButton: {
    padding: 5,
    marginLeft: 5,
  },
  toggleButtonText: {
    color: '#6A6A6A',
    fontSize: 14,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputDescription: {
    height: 100,
    width: '100%',
    borderColor: '#B0B0B0',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#FFF',
  },
  logoutButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
