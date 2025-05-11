import { db } from "../firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export const saveUserData = async (uid, email, fullName) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    email,
    full_name: fullName,
    createdAt: serverTimestamp(),
    bookmarks: [] 
  });
};

export const saveBookmark = async (uid, coffeeShop) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const bookmarks = userSnap.data().bookmarks || [];
    bookmarks.push(coffeeShop); 
    await setDoc(userRef, { bookmarks }, { merge: true });
  }
};

export const removeBookmark = async (uid, shopName) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    let bookmarks = userSnap.data().bookmarks || [];
    bookmarks = bookmarks.filter((bookmark) => bookmark.name !== shopName);
    await setDoc(userRef, { bookmarks }, { merge: true });
  }
};

export const getBookmarks = async (uid) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  return docSnap.exists() ? docSnap.data().bookmarks : [];
};

export const getUserData = async (uid) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  return docSnap.exists() ? docSnap.data() : null;
};
