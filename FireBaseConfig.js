 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
    import { getAuth, createUserWithEmailAndPassword  , signInWithEmailAndPassword ,  onAuthStateChanged  , GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDGZlWR_DCryKHd_0oFOjZLSWqRTyBVmdw",
    authDomain: "coreamin-project.firebaseapp.com",
    projectId: "coreamin-project",
    storageBucket: "coreamin-project.firebasestorage.app",
    messagingSenderId: "378902900640",
    appId: "1:378902900640:web:bf873feebadac41c057ec5",
    measurementId: "G-00ZG95HL1X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export {
     auth,
     createUserWithEmailAndPassword ,
     signInWithEmailAndPassword ,
     onAuthStateChanged ,
     GoogleAuthProvider
    };