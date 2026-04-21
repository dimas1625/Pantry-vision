import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc } from "firebase/firestore";
import { app, db } from "../lib/firebase"
import bcrypt from "bcryptjs";

export async function signIn(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    return data[0]; // Kembalikan data user pertama yang ditemukan
  } else {
    return null;
  }
}

export async function signInWithGoogle(userData: any, callback: any) {
  // Cari apakah email sudah ada di koleksi users
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email)
  );

  const querySnapshot = await getDocs(q);
  const data: any = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    // Jika user sudah ada, update datanya tapi pertahankan role yang sudah ada
    userData.role = data[0].role;
    await updateDoc(doc(db, "users", data[0].id), userData);
    callback({ status: true, data: userData });
  } else {
    // Jika user baru, beri role default "member" dan simpan
    userData.role = "member";
    await addDoc(collection(db, "users"), userData);
    callback({ status: true, data: userData });
  }
}

export async function signup(userData: any, callback: Function) {
  const q = query(collection(db, "users"), where("email", "==", userData.email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length > 0) {
    callback({ status: "error", message: "User already exists" });
  } else {
    // Hashing password dan set default role [cite: 2169, 2359]
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    userData.createdAt = new Date();

    await addDoc(collection(db, "users"), userData)
      .then(() => callback({ status: "success", message: "User registered successfully" }))
      .catch((error: any) => callback({ status: "error", message: error.message }));
  }
}
export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}