import { auth, db } from "./Firebase";

export function watcherUserChanges(callback) {
  const unsub = auth.onAuthStateChanged(user => {
    if (user && !user.isAnonymous) {
      console.log("sesion iniciada");
      callback({
        id: user.uid,
        email: user.email,
        displayName: user.displayName
      });
    } else {
      console.log("Sesion NO iniciada");
      callback(null);
    }
  });

  return unsub;
}

export function watcherUser(callback) {
  const unsub = db.collection("usuarios").onSnapshot(snapshot => {
    const docs = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      docs.push({ ...data, id: doc.id });
    });
    callback(docs);
  });

  return unsub;
}
