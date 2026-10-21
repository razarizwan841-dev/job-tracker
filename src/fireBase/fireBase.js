import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8qvHLv3lL2CNk-QzmorM0lyL_8LN4sI8",
  authDomain: "first-react-app-4b01a.firebaseapp.com",
  projectId: "first-react-app-4b01a",
  storageBucket: "first-react-app-4b01a.firebasestorage.app",
  messagingSenderId: "430954282578",
  appId: "1:430954282578:web:5f123a9c5cea1e8bb0298b",
  measurementId: "G-QTZF6GV0L5",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app); // Yahan se sirf auth export hoga
export const db = getFirestore(app);

export default app;
