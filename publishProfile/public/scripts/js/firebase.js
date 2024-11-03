  // Import Firebase SDKs
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAEB2zXlyoX8YiUo_HpNVWv85FQboll5n8",
    authDomain: "mastodonmamals1.firebaseapp.com", 
    projectId: "mastodonmamals1",
    storageBucket: "mastodonmamals1.firebasestorage.app",
    messagingSenderId: "425790630532",
    appId: "1:425790630532:web:3da2633319daab163db0d1",
    measurementId: "G-RR88Y4M4BP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
