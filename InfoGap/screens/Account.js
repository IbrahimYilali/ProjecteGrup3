import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, storage, db } from '../Firebase/FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';

export default function Account({ navigation }) {
  const [user, setUser] = useState({
    email: '',
    id: null,
    type: 'Standard',
    description: '',
    profileImageUrl: '',
  });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const { email, uid } = currentUser;
        setUser((prevState) => ({ ...prevState, email, id: uid }));
        await loadUserData(uid);
      } else {
        setUser((prevState) => ({ ...prevState, email: 'Unknown User' }));
        navigation.navigate('Login'); // redirige al login si no está autenticado
      }
    });
    return unsubscribe;
  }, []);

  const loadUserData = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const { profileImageUrl, userType, description } = userDoc.data();
        setUser((prevState) => ({
          ...prevState,
          type: userType || 'Standard',
          description: description || '',
          profileImageUrl: profileImageUrl || '',
        }));
        setProfileImage(profileImageUrl || '');
      } else {
        Alert.alert('Error', 'User data not found.');
      }
    } catch (error) {
      Alert.alert('Error', 'Error loading user data.');
    }
  };

  const handleImagePicker = () => {
    if (!auth.currentUser) return;

    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
        quality: 1,
      },
      async (response) => {
        if (!response.didCancel && response.assets && response.assets.length > 0) {
          const fileUri = response.assets[0].uri;
          setProfileImage(fileUri);
          const storageRef = ref(storage, `profileImages/${user.id}`);
          try {
            const responseBlob = await fetch(fileUri);
            const blob = await responseBlob.blob();
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);
            setUser((prevState) => ({ ...prevState, profileImageUrl: url }));
            const userDocRef = doc(db, 'users', user.id);
            await updateDoc(userDocRef, { profileImageUrl: url });
            Alert.alert('Success', 'Profile image updated successfully!');
          } catch (error) {
            Alert.alert('Error', 'Error uploading image. Please try again.');
          }
        }
      }
    );
  };

  const handleLogout = async () => {
    try {
      if (!user.description) {
        Alert.alert('Error', 'Description cannot be empty.');
        return;
      }

      if (user.description.length > 150) {
        Alert.alert('Error', 'Description must be under 150 characters.');
        return;
      }

      const userDocRef = doc(db, 'users', user.id);
      await updateDoc(userDocRef, { description: user.description });
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Error logging out.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <FSuperior
          onPress={(id) => {
            if (id === 1) navigation.goBack();
            else if (id === 2) navigation.navigate('Search');
          }}
        />
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.box}>
          <View style={styles.profileContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Text style={styles.photoText}>👤</Text>
            )}
            <TouchableOpacity style={styles.changeButton} onPress={handleImagePicker} accessible accessibilityLabel="Change profile picture">
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email:</Text>
            <Text style={styles.usernameText}>{user.email}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>User ID:</Text>
            <Text style={styles.usernameText}>{user.id}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>User Type:</Text>
            <Text style={styles.usernameText}>{user.type}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Description:</Text>
            <TextInput
              style={styles.input}
              multiline
              value={user.description}
              onChangeText={(text) => setUser((prevState) => ({ ...prevState, description: text }))}
              placeholder="Enter your description"
              maxLength={150}
            />
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} accessible accessibilityLabel="Log out">
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <FSection
          currentSection={5}
          onPress={(id) => {
            if (id === 1) navigation.navigate('All');
            else if (id === 2) navigation.navigate('Map');
            else if (id === 3) navigation.navigate('Add');
            else if (id === 4) navigation.navigate('Favorites');
            else if (id === 5) navigation.navigate('Account');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  topBar: {
    height: 80,
    backgroundColor: '#c5bbbb',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'flex-end',
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
    width: 100,
    fontSize: 16,
    fontWeight: 'bold',
  },
  usernameText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
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
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#c5bbbb',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
