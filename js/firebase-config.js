// js/firebase-config.js

// 1. Your Web app's Firebase configuration using the 'invitisam' credentials
const firebaseConfig = {
    apiKey: "AIzaSyDV_rvufFhcZw4y0Gml6HLMxgwTWSiRNpY",
    authDomain: "invitisam.firebaseapp.com",
    databaseURL: "https://invitisam-default-rtdb.firebaseio.com",
    projectId: "invitisam",
    storageBucket: "invitisam.firebasestorage.app",
    messagingSenderId: "95958063630",
    appId: "1:95958063630:web:YOUR_WEB_APP_ID" // Replace with your specific Web App ID from Firebase Console
};

// 2. Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// 3. Export core services to be used across the app
const db = firebase.database();
const auth = firebase.auth();

console.log("🔥 Firebase Initialized for NetWorth (invitisam)");
