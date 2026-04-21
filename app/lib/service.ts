import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  addDoc, 
  updateDoc 
} from "firebase/firestore";
import { db } from "./firebase"; 
import bcrypt from "bcryptjs";

export async function signIn(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    return data[0]; 
  } else {
    return null;
  }
}

export async function signInWithGoogle(userData: any, callback: Function) {
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
    userData.role = data[0].role || "member";
    await updateDoc(doc(db, "users", data[0].id), userData);
    callback({ status: true, data: userData });
  } else {
    userData.role = "member";
    userData.createdAt = new Date().toISOString();
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
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    userData.createdAt = new Date().toISOString();

    await addDoc(collection(db, "users"), userData)
      .then(() => callback({ status: "success", message: "User registered successfully" }))
      .catch((error: any) => callback({ status: "error", message: error.message }));
  }
}

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}