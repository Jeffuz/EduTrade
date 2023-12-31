import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, getDoc, query, where, doc, limit, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
export const storage = getStorage(app); 
export const firestoreCollection = collection;
export const firestoreAddDoc = addDoc;
export const firestoreServerTimestamp = serverTimestamp;
export const firestoreGetDocs = getDocs;
export const firestoreQuery = query;
export const firestoreWhere = where;
export const firestoreDoc = doc;
export const firestoreGetDoc = getDoc;
export const firestoreRef = ref; // Export ref
export const firestoreUploadBytes = uploadBytes; // Export uploadBytes
export const firestoreGetDownloadURL = getDownloadURL; // Export getDownloadURL
export const firestoreLimit = limit;
export const firestoreOrderBy = orderBy;

export default app;
