// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1IBYiEFS1mLXaer11Cb1-iQ0gO9thPM4",
  authDomain: "app-firebase-martes.firebaseapp.com",
  projectId: "app-firebase-martes",
  storageBucket: "app-firebase-martes.appspot.com",
  messagingSenderId: "803523548748",
  appId: "1:803523548748:web:1bda3d08f922afce9c06e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const iniDatabase = getFirestore(app);
export const iniStorage = getStorage(app);