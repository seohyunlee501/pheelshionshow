import React, { useState } from "react";
import Modal from "react-modal";

function ModalComponent({ isOpen, onClose, message }) {
  const modalStyle = {
    color: "black", // Set the font color to black
    /* Add other styles as needed */
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div>
        <button onClick={onClose}>Close</button>
        <p>{message}</p>
      </div>
    </Modal>
  );
}

export default ModalComponent;
