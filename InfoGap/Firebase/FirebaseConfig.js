// FirebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase (debes usar tus propias credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyBxvbwFIkeNyQ5k8SIAGYJ0UPraGCpS4bA",
  authDomain: "test-c1325.firebaseapp.com",
  projectId: "test-c1325",
  storageBucket: "test-c1325.appspot.com",
  messagingSenderId: "432531775221",
  appId: "1:432531775221:web:88b519f85cf34e64c16fbc",
  measurementId: "G-GP7QR71Q3S"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener la instancia de Firestore
const db = getFirestore(app);

// Exportar la instancia de Firestore
export default db;
