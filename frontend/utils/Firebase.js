import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "logincartplusx.firebaseapp.com",
  projectId: "logincartplusx",
  storageBucket: "logincartplusx.firebasestorage.app",
  messagingSenderId: "470903349746",
  appId: "1:470903349746:web:55f2bb13dd6eb492ba0b6b"
};



const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}