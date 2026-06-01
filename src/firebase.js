import { initializeApp }
from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {

  apiKey:
    "AIzaSyCH6S7-bytuyphScnKXAPl40g0Z-5lqMzw",

  authDomain:
    "mockverse-ai-cdc74.firebaseapp.com",

  projectId:
    "mockverse-ai-cdc74",

  storageBucket:
    "mockverse-ai-cdc74.firebasestorage.app",

  messagingSenderId:
    "342234227527",

  appId:
    "1:342234227527:web:6e4c004df0a692b927a262",

  measurementId:
    "G-WSTDFQJR4L"

};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const provider =
  new GoogleAuthProvider();