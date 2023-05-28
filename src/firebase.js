// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf5kLbPSRsyzPwToVP2grHmDKmwmaC7z8",
  authDomain: "news-api-auth.firebaseapp.com",
  projectId: "news-api-auth",
  storageBucket: "news-api-auth.appspot.com",
  messagingSenderId: "232249236652",
  appId: "1:232249236652:web:2d7d1e924e41cedfc09309"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app
export const db = getFirestore(app)