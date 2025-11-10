import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAh92mQ4BvB9A5fQ_kEwJ6sRzO8cY_hI4",
  authDomain: "meat-shop-ece1d.firebaseapp.com",
  projectId: "meat-shop-ece1d",
  storageBucket: "meat-shop-ece1d.appspot.com",
  messagingSenderId: "823811818123",
  appId: "1:823811818123:web:9dcf1c3d7e8eb4aaca8a8e",
  measurementId: "G-VJES2YQ3RK"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;


export { app, auth, db, analytics };
