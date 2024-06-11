// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVxbQS2jfdF-fTsUhACiJI3ypZHNBXuXg",
  authDomain: "mensajeria-7fc12.firebaseapp.com",
  projectId: "mensajeria-7fc12",
  storageBucket: "mensajeria-7fc12.appspot.com",
  messagingSenderId: "371813943692",
  appId: "1:371813943692:web:1b9693b98214e32dce2ea9",
  databaseURL: "https://mensajeria-7fc12-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
//referencia al servicio de data base
export const dbRealTime = getDatabase(firebase);