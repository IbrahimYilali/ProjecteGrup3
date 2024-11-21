import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';
import { launchImageLibrary } from 'react-native-image-picker';

export default function Account({ navigation }) {
  const [username] = useState("User1"); 
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null); 

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log("Image picker cancelled");
      } else if (response.errorCode) {
        console.log("Image picker error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setProfileImage(selectedImage); 
      }
    });
  };

  return (
    <View style={styles.container}>
      
      {/* Barra de navegación superior */}
      <View style={styles.topBar}>
        <FSuperior 
          onPress={(id) => {
            if (id === 1) navigation.goBack(); 
            else if (id === 2) navigation.navigate("Home");
          }} 
        />
      </View>

      {/* Sección de configuración con recuadro */}
      <View style={styles.settingsContainer}>
        <View style={styles.box}>
          {/* Foto de perfil y cambio */}
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

          {/* Nombre de usuario (inmodificable) */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Username</Text>
            <Text style={styles.usernameText}>{username}</Text>
          </View>

          {/* Contraseña con funcionalidad de ocultar/mostrar */}
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

          {/* Descripción */}
          <Text style={styles.descriptionTitle}>Description</Text>
          <TextInput 
            style={styles.inputDescription} 
            placeholder="Write here." 
            multiline={true} 
          />
        </View>

        {/* Botón de cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de navegación inferior */}
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

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', 
  },
  topBar: {
    backgroundColor: '#FFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    justifyContent: 'flex-end',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    justifyContent: 'flex-end',
  },
  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
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
    width: 80,
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
