// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsPOiocGqwA9vofo5OrEJ59uMjlgyosFY",
  authDomain: "e-commerce-cccb4.firebaseapp.com",
  projectId: "e-commerce-cccb4",
  storageBucket: "e-commerce-cccb4.appspot.com",
  messagingSenderId: "263748091583",
  appId: "1:263748091583:web:19f8ee5dc1dbb7f1f7500a"
};

const firebaseConfig2 = {
  apiKey: "AIzaSyD-BXsW9Ulh_qhFxe2SndtnI39keQVCYoY",
  authDomain: "e-commerce-2-7a687.firebaseapp.com",
  projectId: "e-commerce-2-7a687",
  storageBucket: "e-commerce-2-7a687.appspot.com",
  messagingSenderId: "939433668604",
  appId: "1:939433668604:web:615807c6a4f7f4e579cc79"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();