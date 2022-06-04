
import { initializeApp } from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyARiuwttzePhJwMeoHcQ1YU546RZBQXgp8",
  authDomain: "slack-clone-8b8e9.firebaseapp.com",
  projectId: "slack-clone-8b8e9",
  storageBucket: "slack-clone-8b8e9.appspot.com",
  messagingSenderId: "335580141676",
  appId: "1:335580141676:web:cfe2a337b6ddce4287e049"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const auth =getAuth()
const Provider= new GoogleAuthProvider()
export  {app,db, auth,Provider}

