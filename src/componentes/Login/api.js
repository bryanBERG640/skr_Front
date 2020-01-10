import { db } from "./Firebase";

export async function createUser(nombre, correo, rol) {
  return await db
    .collection("usuarios")
    // .doc()
    // .set(data)
    .add({
      nombre,
      correo,
      rol
    })
    .then(response => {
      return response.id;
    })
    .catch(console.log);
}

export async function deleteUser(id) {
  return await db
    .collection("usuarios")
    .doc(id)
    .delete()
    .then(response => {
      console.log(response);
    })
    .catch(console.log);
}

export async function updateUser(id, data) {
  return await db
    .collection("usuarios")
    .doc(id)
    .update(data)
    .then(response => {
      console.log(response);
    })
    .catch(console.log);
}
