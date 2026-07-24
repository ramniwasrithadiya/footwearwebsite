import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBJKelgnNneVhvqPA_XUQGNcEs9gXiwYtE",
  authDomain: "emailmobileauth-8090c.firebaseapp.com",
  projectId: "emailmobileauth-8090c",
  storageBucket: "emailmobileauth-8090c.firebasestorage.app",
  messagingSenderId: "579867788756",
  appId: "1:579867788756:web:7c79b19f68f0f09bd80241"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
