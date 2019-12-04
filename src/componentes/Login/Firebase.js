import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCZM-slb4eczUKfKoV9Dgk7o2KayPkUaPo",
  authDomain: "login-skr.firebaseapp.com",
  databaseURL: "https://login-skr.firebaseio.com",
  projectId: "login-skr",
  storageBucket: "login-skr.appspot.com",
  messagingSenderId: "12910307667",
  appId: "1:12910307667:web:5e198ee7034f58784f59a6",
  measurementId: "G-VMFV8XBEM9"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();

// db.settings({
//   timestampsInSnapshots: true
// });

export default firebase;
