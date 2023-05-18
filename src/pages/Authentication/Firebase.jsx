// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkSp0RrYy4qK8ewjMlDdu9fuNCX59hAiM",
  authDomain: "shajalal.firebaseapp.com",
  projectId: "shajalal",
  storageBucket: "shajalal.appspot.com",
  messagingSenderId: "817708041781",
  appId: "1:817708041781:web:c9a296fa8a9c971890137c",
  measurementId: "G-NTFT559KFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;