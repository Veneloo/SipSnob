import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { useAuth } from '../context/authContext';
import { db } from '../firebaseConfig';
import BookmarkItem from './BookmarkItem';

export default function BookmarksList() {
  const { currentUser } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    // subscribe to the user's document
    const unsub = onSnapshot(
      doc(db, 'users', currentUser.uid),
      (snap) => {
        setBookmarks(snap.data()?.bookmarks || []);
      },
      (err) => console.error('bookmark listener error', err)
    );
    return () => unsub();
  }, [currentUser]);

  if (!currentUser) return <p>Loading your bookmarks…</p>;

  return (
    <div style={{ display: 'flex', overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth', width: '100%', maxWidth: '100%', textAlign: "left"}}>
      {bookmarks.map((shop, i) => (
        <BookmarkItem key={i} bookmarkDetails={shop} />
      ))}
    </div>
  );
}
