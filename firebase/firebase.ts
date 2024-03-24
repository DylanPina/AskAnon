import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRuq12ZbwxmuLtnuHFoPH6YavYZVDuen8",
  authDomain: "askanon-9b36f.firebaseapp.com",
  projectId: "askanon-9b36f",
  storageBucket: "askanon-9b36f.appspot.com",
  messagingSenderId: "594708017838",
  appId: "1:594708017838:web:f1d41fd9389c3645f4333f",
  measurementId: "G-BPH3N0BGTM",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
