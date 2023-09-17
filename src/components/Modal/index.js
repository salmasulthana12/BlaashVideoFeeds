// Modal.js
import React from "react";
import "./index.css"; 

const Modal = ({ children, onClose }) => {
    
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
