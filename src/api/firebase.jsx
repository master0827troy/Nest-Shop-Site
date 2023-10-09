import { apiKey } from "./apiKey";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "e-commerce-cccb4.firebaseapp.com",
  projectId: "e-commerce-cccb4",
  storageBucket: "e-commerce-cccb4.appspot.com",
  messagingSenderId: "263748091583",
  appId: "1:263748091583:web:19f8ee5dc1dbb7f1f7500a",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
