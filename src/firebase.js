import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var firebaseConfig = {
  apiKey: "AIzaSyAl7UJsrEJPpPG547pcoE2D2Dk9b_9Du18",
  authDomain: "apes-together-strong.firebaseapp.com",
  projectId: "apes-together-strong",
  storageBucket: "apes-together-strong.appspot.com",
  messagingSenderId: "82497102230",
  appId: "1:82497102230:web:58024650b312495762fdb7",
  measurementId: "G-5W9077QD3J",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
