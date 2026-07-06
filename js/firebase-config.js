// js/firebase-config.js

// Firebase project configuration for 'invitisam'
const firebaseConfig = {
    apiKey: "AIzaSyDV_rvufFhcZw4y0Gml6HLMxgwTWSiRNpY",
    authDomain: "invitisam.firebaseapp.com",
    databaseURL: "https://invitisam-default-rtdb.firebaseio.com",
    projectId: "invitisam",
    storageBucket: "invitisam.firebasestorage.app",
    messagingSenderId: "95958063630",
    appId: "1:95958063630:web:YOUR_WEB_APP_ID" 
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export instances to be used by other files
const database = firebase.database();
const auth = firebase.auth();
