import React from 'react';
import { motion } from 'framer-motion';

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Young Serif', serif"
      }}
    >
      <div
        style={{
          background: '#fdf3e7',
          borderRadius: '16px',
          padding: '2rem',
          maxWidth: '400px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          color: '#5a3e2b'
        }}
      >
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{message}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={onCancel}
            style={{
              backgroundColor: '#ccc',
              color: '#333',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: "'Young Serif', serif"
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: '#8B5E3C',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: "'Young Serif', serif"
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
}
