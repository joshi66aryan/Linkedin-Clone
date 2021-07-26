import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAKtstlZq7sp5xlrgSygabDkuAuIRIKX3Q",
    authDomain: "linkedin-clone-65f87.firebaseapp.com",
    projectId: "linkedin-clone-65f87",
    storageBucket: "linkedin-clone-65f87.appspot.com",
    messagingSenderId: "215821072108",
    appId: "1:215821072108:web:fd483c69371bfe111d17c9"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export { auth, provider, storage};
  export default db;