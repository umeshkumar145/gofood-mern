import React from 'react';
import ReactDOM from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
};

const CLOSE_BUTTON_STYLES = {
  marginLeft: '90%',
  marginTop: '-35px',
};

export default function Modal({ children, onClose }) {
  const portalRoot = document.getElementById('cart-root');

  if (!portalRoot) {
    console.error("Element with id 'cart-root' not found.");
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <button
          className='btn bg-danger fs-4'
          style={CLOSE_BUTTON_STYLES}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    portalRoot
  );
}
