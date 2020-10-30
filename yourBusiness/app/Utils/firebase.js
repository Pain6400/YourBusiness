import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDXg27xjArj1hfK4QNtfcna9XtoEKhTHs4",
    authDomain: "your-business-40163.firebaseapp.com",
    databaseURL: "https://your-business-40163.firebaseio.com",
    projectId: "your-business-40163",
    storageBucket: "your-business-40163.appspot.com",
    messagingSenderId: "101901354903",
    appId: "1:101901354903:web:5d5a0a7876b4a2418b66d2"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);