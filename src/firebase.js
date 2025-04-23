// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0qjdx504ydhvIIl2KsQySkAbjQ9VM3-E",
  authDomain: "nutritionlikes.firebaseapp.com",
  databaseURL: "https://nutritionlikes-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nutritionlikes",
  storageBucket: "nutritionlikes.firebasestorage.app",
  messagingSenderId: "1060872281462",
  appId: "1:1060872281462:web:cf3d4bb22e3dbccc3b2e57",
  measurementId: "G-TV4EGLG0J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const    analytics = getAnalytics(app);
const db = getDatabase(app);

export { db };

// export { db };