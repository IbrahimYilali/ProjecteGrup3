// Importarem les funcions necessàries des del SDK de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Afegim el servei de Storage

const firebaseConfig = {
  apiKey: "AIzaSyBxvbwFIkeNyQ5k8SIAGYJ0UPraGCpS4bA",
  authDomain: "test-c1325.firebaseapp.com",
  projectId: "test-c1325",
  storageBucket: "test-c1325.appspot.com",
  messagingSenderId: "432531775221",
  appId: "1:432531775221:web:88b519f85cf34e64c16fbc",
  measurementId: "G-GP7QR71Q3S"
};

// Inicialitzarem l'aplicació de Firebase
const app = initializeApp(firebaseConfig);

// Inicialitzarem els serveis d'Autenticació, Firestore i Storage
const auth = getAuth(app); // Crearem el servei d'autenticació
const db = getFirestore(app); // Crearem el servei de base de dades Firestore
const storage = getStorage(app); // Crearem el servei de Storage

// Exportarem els serveis per utilitzar-los en altres parts de l'aplicació
export { auth, db, storage };
