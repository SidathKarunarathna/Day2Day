import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDmI0SiJOXAWEXbOdayMype1AxelvBP0Gs",
    authDomain: "day2day-4ae66.firebaseapp.com",
    projectId: "day2day-4ae66",
    storageBucket: "day2day-4ae66.appspot.com",
    messagingSenderId: "338410259920",
    appId: "1:338410259920:web:3a4bef8356fdddd028e5d5",
    measurementId: "G-R1J6R5D3TC"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
