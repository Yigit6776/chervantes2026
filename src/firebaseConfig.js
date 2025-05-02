import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 


const firebaseConfig = {
    apiKey: "AIzaSyABpiR2yPBei0d41n7Q05vQhw3eIvDy5Dc",
    authDomain: "chervantes-687a8.firebaseapp.com",
    projectId: "chervantes-687a8",
    storageBucket: "chervantes-687a8.firebasestorage.app",
    messagingSenderId: "783775579711",
    appId: "1:783775579711:web:5c2080ddc2eb27a357028a"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export { db };
