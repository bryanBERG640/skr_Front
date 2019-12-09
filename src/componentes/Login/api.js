import { db } from "./Firebase";

export async function createUser(data) {
  return await db
    .collection("usuarios")
    .doc()
    .set(data);
}

export async function deleteUser(id) {
  return await db
    .collection("usuarios")
    .doc(id)
    .delete();
}

export async function updateUser(id, data) {
  return await db
    .collection("usuarios")
    .doc(id)
    .update(data);
}
