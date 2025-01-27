import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { GeoPoint } from 'firebase/firestore';
import MapView, { Marker } from 'react-native-maps'; // Ensure 'react-native-maps' is installed
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Firebase Firestore
import { firebaseApp } from '../Firebase/FirebaseConfig'; // Firebase initialization
import FSection from '../components/FSection';
import FSuperior from '../components/FSuperior';

const db = getFirestore(firebaseApp); // Firebase Firestore instance
const storage = getStorage(firebaseApp); // Firebase Storage instance

export default function Add({ navigation }) {
    const [image, setImage] = useState(require('../assets/default_image.jpg')); // Set default image initially
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState({
        latitude: 41.390622,  // Default coordinates for Barcelona
        longitude: 2.148486,
    });
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [hasCameraRollPermission, setHasCameraRollPermission] = useState(false);
    const [selectedType, setSelectedType] = useState('1'); // Default selected type is 'Monument'
    const [modalVisible, setModalVisible] = useState(false); // State to control Modal visibility

    // Request permissions on component mount
    useEffect(() => {
        const getPermissions = async () => {
            try {
                // Request location permissions
                const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
                if (locationStatus !== 'granted') {
                    alert('Location permission is required');
                    return;
                }
                setHasLocationPermission(true);

                // Request camera roll permissions
                const { status: cameraRollStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (cameraRollStatus !== 'granted') {
                    alert('Camera roll permission is required');
                    return;
                }
                setHasCameraRollPermission(true);

                // If location permission granted, get current location
                if (locationStatus === 'granted') {
                    const location = await Location.getCurrentPositionAsync({});
                    setLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });
                }
            } catch (error) {
                console.error("Error requesting permissions:", error);
            }
        };

        getPermissions();
    }, []);

    // Open image picker
    const handleImagePicker = async () => {
        if (hasCameraRollPermission) {
            try {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 4],
                    quality: 1,
                });

                if (!result.canceled && result.assets && result.assets.length > 0) {
                    const selectedImageUri = result.assets[0].uri; // URI of the selected image
                    setImage({ uri: selectedImageUri }); // Update image state
                }
            } catch (error) {
                console.log("Error opening gallery:", error);
            }
        } else {
            alert('You need to grant camera roll permission to select an image.');
        }
    };

    // Handle map press to set location
    const handleMapPress = (e) => {
        const { coordinate } = e.nativeEvent;
        setLocation({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
    };

    // Upload image to Firebase Storage
    const uploadImageToFirebase = async (uri) => {
        const filename = uri.split('/').pop(); // Get file name
        const imageRef = ref(storage, filename); // Reference to the storage path

        // Convert URI to a blob for upload
        const response = await fetch(uri);
        const blob = await response.blob();

        try {
            await uploadBytes(imageRef, blob); // Upload image
            const downloadURL = await getDownloadURL(imageRef); // Get URL of the uploaded image
            return downloadURL; // Return the image URL
        } catch (error) {
            console.log('Error uploading image: ', error);
            throw new Error('Failed to upload image');
        }
    };

    // Submit function to add new entry to Firestore
    const handleSubmit = async () => {
        if (!title || !description || !location) {
            alert('Please fill in all fields.');
            return;
        }

        const currentDate = new Date().toISOString().split('T')[0]; // Get current date (YYYY-MM-DD)

        const newEntry = {
            Title: title,
            Description: description,
            Geolocation: new GeoPoint(location.latitude, location.longitude), // Convert to GeoPoint
            Date: currentDate, // Save only the date
            Favorites: false, // Default Favorite field
            Type: selectedType, // Save selected category type (e.g., Monument, Restaurant)
        };

        // If there's an image, upload it to Firebase Storage
        if (image && image.uri) {
            try {
                const imageUrl = await uploadImageToFirebase(image.uri); // Upload the image
                newEntry.Image_URL = imageUrl; // Set image URL
            } catch (error) {
                alert('Error uploading image');
                return;
            }
        }

        // Add new entry to Firestore
        try {
            const docRef = await addDoc(collection(db, 'Preguntes'), newEntry); // Add to the correct collection
            console.log("Document written with ID: ", docRef.id);

            // After adding document, navigate to "All" and trigger reload
            navigation.navigate("All", { reload: true }); // Pass a parameter to indicate reload
        } catch (e) {
            console.error("Error adding document: ", e);
            alert('Failed to upload data');
        }
    };

    // Handle the type selection from the modal
    const handleSelectType = (type) => {
        setSelectedType(type);
        setModalVisible(false); // Close the modal after selection
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.container}>
                    {/* Top navigation bar */}
                    <View style={styles.topBar}>
                        <FSuperior
                            onPress={(id) => {
                                if (id === 1) navigation.goBack();
                                else if (id === 2) navigation.navigate("Search");
                            }}
                        />
                    </View>

                    {/* Main content */}
                    <View style={styles.content}>
                        {/* Image section */}
                        <View style={styles.imageContainer}>
                            <Image source={image ? image : require('../assets/default_image.jpg')} style={styles.image} /> {/* Show selected image or default */}
                            <TouchableOpacity onPress={handleImagePicker} style={styles.changeImageButton}>
                                <Text style={styles.buttonText}>Change Image</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Title */}
                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                        />

                        {/* Description */}
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                        />

                        {/* Modal for selecting category type */}
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pickerButton}>
                            <Text style={styles.buttonText}>Select Category</Text>
                        </TouchableOpacity>

                        <Text>Selected Category: {selectedType}</Text>

                        {/* Map */}
                        {hasLocationPermission && location ? (
                            <View style={styles.mapContainer}>
                                <MapView
                                    style={styles.map}
                                    initialRegion={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                    onPress={handleMapPress}
                                >
                                    <Marker coordinate={location} title="Selected Location" />
                                </MapView>
                            </View>
                        ) : (
                            <Text>No location permission granted</Text>
                        )}

                        {/* Submit button */}
                        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>

                        {/* Handle location press to navigate to "Map" */}
                        <TouchableOpacity onPress={() =>
                            navigation.navigate("Map", {
                                latitude: location.latitude,
                                longitude: location.longitude,
                                title: title,
                                description: description
                            })
                        }>
                            <Text>View on Map</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bottom navigation bar */}
                    <View style={styles.bottomBar}>
                        <FSection
                            currentSection={3}
                            onPress={(id) => {
                                if (id === 1) navigation.navigate("All");
                                else if (id === 2) navigation.navigate("Map");
                                else if (id === 3) navigation.navigate("Add");
                                else if (id === 4) navigation.navigate("Favorites");
                                else if (id === 5) navigation.navigate("Account");
                            }}
                        />
                    </View>

                    {/* Modal for category selection */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Choose a Category:</Text>
                                <TouchableOpacity onPress={() => handleSelectType('1')} style={styles.optionButton}>
                                    <Text style={styles.buttonText}>Monument</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleSelectType('2')} style={styles.optionButton}>
                                    <Text style={styles.buttonText}>Restaurant</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleSelectType('3')} style={styles.optionButton}>
                                    <Text style={styles.buttonText}>Park</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleSelectType('4')} style={styles.optionButton}>
                                    <Text style={styles.buttonText}>Museum</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                    <Text style={styles.buttonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f4f4f4',
    },
    topBar: {
        height: 80,
        backgroundColor: '#c5bbbb',
        borderBottomWidth: 1,
        borderBottomColor: '#c5bbbb',
        justifyContent: 'flex-end',
    },
    content: {
        padding: 20,
        flex: 1,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    changeImageButton: {
        marginTop: 10,
        backgroundColor: '#c5bbbb',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    pickerButton: {
        backgroundColor: '#c5bbbb',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    mapContainer: {
        height: 200,
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    submitButton: {
        backgroundColor: '#c5bbbb',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    bottomBar: {
        height: 80,
        backgroundColor: '#c5bbbb',
        borderTopWidth: 1,
        borderTopColor: '#c5bbbb',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionButton: {
        backgroundColor: '#c5bbbb',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: '#ff4c4c',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
});
