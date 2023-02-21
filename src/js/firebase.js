// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBrCmMvGtxv3IVko35jUPWMuDN8AToOm-o',
	authDomain: 'app-todo-8eec7.firebaseapp.com',
	projectId: 'app-todo-8eec7',
	storageBucket: 'app-todo-8eec7.appspot.com',
	messagingSenderId: '217961163151',
	appId: '1:217961163151:web:cb449ab309f3b93553c3fa',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
