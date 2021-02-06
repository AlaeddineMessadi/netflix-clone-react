import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDylHjRXYP9mtfv6RieIK-O9F7SjhX9Y60",
  authDomain: "netflix-clone-react-f182c.firebaseapp.com",
  projectId: "netflix-clone-react-f182c",
  storageBucket: "netflix-clone-react-f182c.appspot.com",
  messagingSenderId: "791382904217",
  appId: "1:791382904217:web:c40e3b482fa23d0a5bd708",
  measurementId: "G-YMG84WGEHJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth };
export default db;
