import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "centering-thought-mh7sp",
  appId: "1:450707309177:web:96715f4739529726b5caa8",
  apiKey: "AIzaSyCAMuEXLFlYgm_byG8q9NoAMucJU0XIjnk",
  authDomain: "centering-thought-mh7sp.firebaseapp.com",
  storageBucket: "centering-thought-mh7sp.firebasestorage.app",
  messagingSenderId: "450707309177",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-premiumfootwearm-be09328f-5fbb-4bd5-b810-8398a947e5b2");
