import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
    doc,
    deleteDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

const ITEMS = 'items';

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    ITEMS,
    query,
    onSnapshot,
    orderBy,
    doc,
    deleteDoc,
};