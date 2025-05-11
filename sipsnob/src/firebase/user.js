import { db } from "../firebaseConfig";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export const saveBookmark = async (uid, coffeeShop) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const bookmarks = userSnap.data().bookmarks || [];
    bookmarks.push(coffeeShop);

    await updateDoc(userRef, { bookmarks });
  }
};

export const removeBookmark = async (uid, coffeeShop) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    let bookmarks = userSnap.data().bookmarks || [];
    bookmarks = bookmarks.filter((shop) => shop.name !== coffeeShop.name);

    await updateDoc(userRef, { bookmarks });
  }
};

export const getUserBookmarks = async (uid) => {
  const docSnap = await getDoc(doc(db, "users", uid));
  return docSnap.exists() ? docSnap.data().bookmarks : [];
};
