import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, getDoc, query, where, doc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app)
export const firestoreCollection = collection;
export const firestoreAddDoc = addDoc;
export const firestoreServerTimestamp = serverTimestamp;
export const firestoreGetDocs = getDocs; // Export getDocs
export const firestoreQuery = query;
export const firestoreWhere = where;
export const firestoreDoc = doc;
export const firestoreGetDoc = getDoc;

export default app;
