// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi1ci3Uh9BENAe_Q_VZM7qR3S0oU-iWwM",
  authDomain: "gotopper-8e936.firebaseapp.com",
  projectId: "gotopper-8e936",
  storageBucket: "gotopper-8e936.firebasestorage.app",
  messagingSenderId: "815539481564",
  appId: "1:815539481564:web:1a6b87bd220b79ba78bd19",
  measurementId: "G-DPPM918HKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Enable Google and GitHub sign-in in Firebase Console Authentication > Sign-in method

export { auth, googleProvider, githubProvider };
