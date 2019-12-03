import firebase from "../Login/Firebase";

export const verificacion = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("sesion iniciada");
      return true;
    } else {
      console.log("sin sesion");
      return false;
    }
  });
};
