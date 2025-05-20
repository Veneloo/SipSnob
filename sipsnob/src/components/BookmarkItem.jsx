import React from 'react';
import sampleImg from '../assets/sampleimg.png';
import { auth, db } from '../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';

export default function BookmarkItem({ bookmarkDetails, onRemove }) {
  if (!bookmarkDetails || !auth.currentUser) return null;

  const handleUnfavorite = async () => {
    const confirmed = window.confirm("Do you want to remove this bookmark?");
    if (!confirmed) return;

    try {
      const userId = auth.currentUser.uid;
      const ref = doc(db, `users/${userId}/bookmarks`, bookmarkDetails.id || bookmarkDetails.place_id);
      await deleteDoc(ref);
      if (onRemove) {
        onRemove(bookmarkDetails);
      }
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
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        backgroundColor: "#572e05",
        overflow: "hidden",
        flexShrink: "0"
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
        title="Remove Bookmark"
      >
        ★
      </button>

      {/* shop name */}
      <h2
        style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          right: 8,
          margin: 4,
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
