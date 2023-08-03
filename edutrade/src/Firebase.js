import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCPjLg7IUXwK93yLEz9TrUNqrVD4RQfQF0",
    authDomain: "edutrade-c527a.firebaseapp.com",
    projectId: "edutrade-c527a",
    storageBucket: "edutrade-c527a.appspot.com",
    messagingSenderId: "335016995037",
    appId: "1:335016995037:web:b40596eabd2ba2f7145334"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)