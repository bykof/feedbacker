import * as firebase from "firebase/app";
import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCSv32yDYl4PKG5lCVYPtDfKao4fzXfwqE",
  authDomain: "feedbacker-7c70f.firebaseapp.com",
  databaseURL: "https://feedbacker-7c70f.firebaseio.com",
  projectId: "feedbacker-7c70f",
  storageBucket: "feedbacker-7c70f.appspot.com",
  messagingSenderId: "582223341462",
  appId: "1:582223341462:web:e7d32e13419868052f5fb7",
  measurementId: "G-C5EL1WXVE7"
};

export default function initFirebase() {
  firebase.initializeApp(firebaseConfig);
}
