import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "./FireBaseConfig.js";

// Sign Up Form
let signUpEmail = document.getElementById("signup-email")
let signUpPass = document.getElementById("signup-password")

// Login Form
let loginEmail = document.getElementById("login-email")
let loginPass = document.getElementById("login-password")

const signUpBtn = document.getElementById("signUpBtn"); // Fixed minor typo from signUpForm to signUpBtn to match your event listener
const isSigninUp = false;

// Helper function loader dikhane ke liye
const showLoader = (message) => {
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

// Helper function error dikhane ke liye
const showErrorAlert = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
};

signUpBtn.addEventListener("click", () => {
  console.log("Sign Up button clicked");

  let email = signUpEmail.value;
  let password = signUpPass.value;

  if (!email || !password) return; // Basic check agar fields khali hon

  // Loader Shuru
  showLoader('Creating your account...');

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);

      // Success hone par SweetAlert band ho kar redirect hoga
      Swal.close();
      window.location.href = "DashBoard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing up:", errorCode, errorMessage);

      // Error Alert
      showErrorAlert(errorMessage);
    });

});


//    Login Function 
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

  let email = loginEmail.value;
  let password = loginPass.value;

  if (!email || !password) return;

  // Loader Shuru
  showLoader('Logging you in...');

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User logged in:", user);

      Swal.close();
      window.location.href = "DashBoard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error logging in:", errorCode, errorMessage);

      // Error Alert
      showErrorAlert(errorMessage);
    });
});


//    continue with google button function
const continueWithGoogleBtnSignUp = document.getElementById('continueWithGoogleBtnSignUp')
const continueWithGoogleBtn = document.getElementById("continueWithGoogleBtn");

const provider = new GoogleAuthProvider();

const continueWithGoogleFunction = () => {

  // Loader Shuru
  showLoader('Connecting with Google...');

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("User signed in with Google:", user);

      Swal.close();
      window.location.href = "DashBoard.html"; // Google login par bhi redirect add kar diya
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error signing in with Google:", errorCode, errorMessage);

      // Error Alert
      showErrorAlert(errorMessage);
    });

};

continueWithGoogleBtn.addEventListener("click", continueWithGoogleFunction)
continueWithGoogleBtnSignUp.addEventListener("click", continueWithGoogleFunction)


//    Firebase User Check
onAuthStateChanged(auth, (user) => {
  console.log("Auth state changed. User:", user);
  let path = window.location.pathname;
  let authPage = path.endsWith("index.html") || path === "/";
  console.log("Is on auth page:", authPage);

  if (user && authPage && !isSigninUp) {
    const uid = user.uid;
    window.location.replace("DashBoard.html");
  } else {
    // ...
  }
});