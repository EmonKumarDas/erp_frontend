import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyCj30_AIBH-EScWhWIyCtrrPECOrKCseuI",
    authDomain: "shahjalal-lighting.firebaseapp.com",
    projectId: "shahjalal-lighting",
    storageBucket: "shahjalal-lighting.appspot.com",
    messagingSenderId: "634495567276",
    appId: "1:634495567276:web:4489e61106b286647d2609",
    measurementId: "G-S5HFBKGEW9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;