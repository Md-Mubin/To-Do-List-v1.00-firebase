// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbiQwUytQoCBup5OTmTwGwDbXg-Fy1hdY",
  authDomain: "email-authentication-1.firebaseapp.com",
  databaseURL: "https://email-authentication-1-default-rtdb.firebaseio.com",
  projectId: "email-authentication-1",
  storageBucket: "email-authentication-1.firebasestorage.app",
  messagingSenderId: "974524209893",
  appId: "1:974524209893:web:043871b5b4959feccd520c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app