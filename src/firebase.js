import firebase from 'firebase/app';
import "firebase/messaging";
import "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBufydG9iMnvTmQenW5tvtNdKOzMWENoKY",
  authDomain: "cloud-message-7dac1.firebaseapp.com",
  projectId: "cloud-message-7dac1",
  storageBucket: "cloud-message-7dac1.appspot.com",
  messagingSenderId: "505390988612",
  appId: "1:505390988612:web:911ae108cbf926b5d9eb11",
  measurementId: "G-PMZ5VNN310"
};

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage();
export {storage, firebase as default};

