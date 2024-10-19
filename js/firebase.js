import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkKPMKs6NWS09GQays7-T3jafmgvPV7Nw",
    authDomain: "gym-management-system-692b3.firebaseapp.com",
    projectId: "gym-management-system-692b3",
    storageBucket: "gym-management-system-692b3.appspot.com",
    messagingSenderId: "781893804629",
    appId: "1:781893804629:web:9d4e51800322787b25eadc",
    measurementId: "G-8KXBJDL1B7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
