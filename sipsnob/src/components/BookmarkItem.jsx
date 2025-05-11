import React from 'react';
import sampleImg from '../assets/sampleimg.png';
import { useAuth } from '../context/authContext';
import { db } from '../firebaseConfig';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';

export default function BookmarkItem({ bookmarkDetails }) {
  const { currentUser } = useAuth();
  if (!bookmarkDetails || !currentUser) return null;

  const handleUnfavorite = async () => {
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        bookmarks: arrayRemove(bookmarkDetails)
      });
    } catch (err) {
      console.error('Failed to remove bookmark', err);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: 250,
        height: 200,
        borderRadius: 50,
        marginRight: 24,
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
      }}
    >
      {/* background image */}
      <div
        style={{
          backgroundImage: `url(${sampleImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'opacity(0.4)',
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />

      {/* unfavorite button */}
      <button
        onClick={handleUnfavorite}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          background: 'none',
          border: 'none',
          fontSize: 24,
          cursor: 'pointer',
          color: '#fff'
        }}
      >
        ★
      </button>

      {/* shop name */}
      <h2
        style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          margin: 0,
          zIndex: 2,
          color: '#f5e1c8',
          textShadow: '0 2px 2px rgba(0,0,0,0.2)'
        }}
      >
        {bookmarkDetails.name}
      </h2>
    </div>
  );
}
