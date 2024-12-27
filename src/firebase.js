import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBzMiBcq814OcO2epgqSMiJ45_Nj0UytbQ",
  authDomain: "todo-app-6c433.firebaseapp.com",
  projectId: "todo-app-6c433",
  storageBucket: "todo-app-6c433.firebasestorage.app",
  messagingSenderId: "1087446270676",
  appId: "1:1087446270676:web:6b5f3aa7ae931fc1d5b141"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
