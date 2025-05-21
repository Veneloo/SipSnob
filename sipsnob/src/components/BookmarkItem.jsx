import React, { useState } from 'react';
import sampleImg from '../assets/sampleimg.png';
import { auth, db } from '../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ConfirmModal from './ConfirmModal'; 
import { useNavigate } from 'react-router-dom';

export default function BookmarkItem({ bookmarkDetails, onRemove }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  if (!bookmarkDetails || !auth.currentUser) return null;

  const handleConfirmedRemove = async () => {
    try {
      const userId = auth.currentUser.uid;
      const ref = doc(db, `users/${userId}/bookmarks`, bookmarkDetails.id || bookmarkDetails.place_id);
      await deleteDoc(ref);
      setIsVisible(false);
      setTimeout(() => {
        if (onRemove) onRemove(bookmarkDetails);
      }, 300);
    } catch (err) {
      console.error('Failed to remove bookmark', err);
    }
  };

  const handleCardClick = () => {
    navigate(`/shop_details/${bookmarkDetails.place_id}`, {
      state: { shop: bookmarkDetails }
    });
  };

  return (
    <>
      {showConfirm && (
        <ConfirmModal
          message="Do you want to remove this bookmark?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            handleConfirmedRemove();
          }}
        />
      )}

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
          flexShrink: "0",
          cursor: 'pointer'
        }}
        onClick={handleCardClick}
      >
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
        <FaStar
          onClick={(e) => {
            e.stopPropagation();
            setShowConfirm(true);
          }}
          style={{
            position: 'absolute',
            top: 12,
            right: 15,
            zIndex: 2,
            cursor: 'pointer',
            fontSize: '1.3rem',
            color: '#FFD700',
          }}
          title="Remove Bookmark"
        />
        <h2
          style={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            right: 8,
            margin: 4,
            zIndex: 2,
            color: '#f5e1c8',
            textShadow: '0 2px 2px rgba(0,0,0,0.2)',
            textAlign: 'center',
            fontFamily: 'YoungSerif'
          }}
        >
          {bookmarkDetails.name}
        </h2>
      </motion.div>
    </>
  );
}
