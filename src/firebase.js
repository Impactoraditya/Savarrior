// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {getMessaging} from "firebase/messaging"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJXQjkIiMSxVs2ASy5eV8XXXXXXXXX",
  authDomain: "XXXXXXXXXX",
  projectId: "XXXXXXXXX",
  storageBucket: "XXXXXXXXX",
  messagingSenderId: "XXXXXXXXXX",
  appId: "1:XXXXXXXXX:web:XXXXXXXXXXX"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
export const messaging = getMessaging(app)
