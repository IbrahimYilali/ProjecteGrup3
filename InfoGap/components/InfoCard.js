import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { doc, setDoc, getDocs, query, where, collection, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

const InfoCard = ({
  title = "Title",
  description = "Description goes here",
  date = "Date",
  location = "Location",
  initialFavorites = false,
  imageUrl, // URL de la imagen
  documentId, // ID del documento para evitar duplicados
  onLocationPress,
}) => {
  const [liked, setLiked] = useState(initialFavorites);
  const [likes, setLikes] = useState(0);
  const [docId, setDocId] = useState(documentId);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSource, setImageSource] = useState(
    imageUrl ? { uri: imageUrl } : require("../assets/default_image.jpg")
  );

  useEffect(() => {
    const initializeDocument = async () => {
      try {
        const collectionRef = collection(db, "Preguntas");

        // Buscar si hay un documento con TODOS los campos iguales
        const querySnapshot = await getDocs(
          query(
            collectionRef,
            where("title", "==", title),
            where("description", "==", description),
            where("date", "==", date),
            where("location", "==", location)
          )
        );

        if (!querySnapshot.empty) {
          // Documento exacto encontrado, no hacemos nada
          const existingDoc = querySnapshot.docs[0];
          const data = existingDoc.data();
          setLikes(data.likes || 0);
          setLiked(data.Favorites || false);
          setDocId(existingDoc.id);

          console.log("Documento ya existe. No se realizará ninguna acción.");
        } else {
          // Crear un nuevo documento si no existe duplicado exacto
          const newDocRef = doc(collectionRef);
          const newData = {
            title,
            description,
            date,
            location,
            likes: 0,
            Favorites: initialFavorites === true,
          };

          // Solo agregar `imageUrl` si existe
          if (imageUrl) {
            newData.imageUrl = imageUrl;
          }

          await setDoc(newDocRef, newData);
          setDocId(newDocRef.id);
          console.log("Documento creado con éxito.");
        }
      } catch (error) {
        console.error("Error inicializando el documento:", error);
        Alert.alert("Error", "No se pudo inicializar el documento.");
      }
    };

    initializeDocument();
  }, [title, description, date, location, imageUrl]);

  const handleLikePress = async () => {
    try {
      if (!docId) return;

      const newLikedState = !liked;
      setLiked(newLikedState);

      const docRef = doc(db, "Preguntas", docId);
      const newLikes = newLikedState ? likes + 1 : likes - 1;

      await updateDoc(docRef, {
        Favorites: newLikedState,
        likes: newLikes,
      });

      setLikes(newLikes);
    } catch (error) {
      console.error("Error al actualizar Firestore:", error);
      Alert.alert("Error", "No se pudo actualizar el documento.");
    }
  };

  const handleImageError = () => {
    setImageSource(require("../assets/default_image.jpg")); // Imagen predeterminada
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rowContainer}>
        {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}
        <Image
          source={imageSource}
          style={styles.image}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={handleImageError}
        />
        <View style={styles.textContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton} onPress={handleLikePress}>
          <Icon name={liked ? "heart" : "heart-outline"} size={20} color="red" />
          <Text style={styles.likeText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationButton} onPress={onLocationPress}>
          <Icon name="location-outline" size={20} color="red" />
          <Text style={styles.locationText}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.8,
    elevation: 5,
    marginHorizontal: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  image: {
    width: "40%",
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  textContainer: {
    width: "55%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 7,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#555",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#555",
  },
});

export default InfoCard;
