import {auth , createUserWithEmailAndPassword , signInWithEmailAndPassword ,  onAuthStateChanged , GoogleAuthProvider } from "./FireBaseConfig.js";


// Sign Up Form

let signUpEmail = document.getElementById("signup-email")
let signUpPass = document.getElementById("signup-password")


// Login Form

let loginEmail = document.getElementById("login-email")
let loginPass = document.getElementById("login-password")



const signUpForm = document.getElementById("signUpBtn");

const  isSigninUp = false;

signUpBtn.addEventListener("click", () => {
    console.log("Sign Up button clicked");

    let email = signUpEmail.value;
    let password = signUpPass.value;

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("User signed up:", user);
    window.location.href = "DashBoard.html"; 
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error signing up:", errorCode, errorMessage);

    // ..
  });

});









//    Login Function 


const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
    
   let email = loginEmail.value;
    let password = loginPass.value;

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User logged in:", user);
    window.location.href = "DashBoard.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error logging in:", errorCode, errorMessage);
  });
});



//  continue with google button function

const continueWithGoogleBtn = document.getElementById("continueWithGoogleBtn");
const provider = new GoogleAuthProvider();

continueWithGoogleBtn.addEventListener("click", () => {

signInWithPopup(auth, provider)
  .then((result) => {

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("User signed in with Google:", user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log("Error signing in with Google:", errorCode, errorMessage, email, credential);
  });

})









onAuthStateChanged(auth, (user) => {

    console.log("Auth state changed. User:", user);
    let path = window.location.pathname;
    let authPage = path.endsWith("index.html")  || path === "/" ;
    console.log("Is on auth page:", authPage);

  if (user && authPage && !isSigninUp) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;

    window.location.replace("DashBoard.html");
    // ...
  } else {
    // User is signed out
    // ...
  }
});