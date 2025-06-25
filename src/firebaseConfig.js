// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBWTkea2ez-VQhixwmUGGwmYU8dvQVZkXo",
    authDomain: "miapp-integral-cf381.firebaseapp.com",
    projectId: "miapp-integral-cf381",
    storageBucket: "miapp-integral-cf381.firebasestorage.app",
    messagingSenderId: "665849489956",
    appId: "1:665849489956:web:605e64c4e8fdc0435186b1",
    measurementId: "G-FJ8J3GJD7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };