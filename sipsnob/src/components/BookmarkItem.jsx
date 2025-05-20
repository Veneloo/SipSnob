import React, { useState } from 'react';
import sampleImg from '../assets/sampleimg.png';
import { auth, db } from '../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BookmarkItem({ bookmarkDetails, onRemove }) {
  const [isVisible, setIsVisible] = useState(true);
  if (!bookmarkDetails || !auth.currentUser) return null;

  const handleUnfavorite = async () => {
    const confirmed = window.confirm("Do you want to remove this bookmark?");
    if (!confirmed) return;

    try {
      const userId = auth.currentUser.uid;
      const ref = doc(db, `users/${userId}/bookmarks`, bookmarkDetails.id || bookmarkDetails.place_id);
      await deleteDoc(ref);
      setIsVisible(false); // Trigger fade-out animation
      setTimeout(() => {
        if (onRemove) onRemove(bookmarkDetails);
      }, 300); // Delay state removal until animation finishes
    } catch (err) {
      console.error('Failed to remove bookmark', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
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
      <FaStar
        onClick={handleUnfavorite}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          cursor: 'pointer',
          fontSize: '1.5rem',
          color: '#FFD700',
        }}
        title="Remove Bookmark"
      />

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
    </motion.div>
  );
}
