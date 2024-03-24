import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7dqT3YCAwcYX90-uZ7pGeDAvej32-oME",
  authDomain: "hackathon-1-c6741.firebaseapp.com",
  projectId: "hackathon-1-c6741",
  storageBucket: "hackathon-1-c6741.appspot.com",
  messagingSenderId: "828843058852",
  appId: "1:828843058852:web:b9c47c3e5f5c5ca03a2831",
  measurementId: "G-P53ES9T7SX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
