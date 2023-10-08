import React, { useState } from "react";
import Modal from "react-modal";

import { Hahmlet } from "next/font/google"; // 해당 폰트의 함수를 사용합니다.

const hahmlet = Hahmlet({ preload: false, weight: ["300", "600"] }); // 변수를 선언하고, 함수의 인자로 스타일을 지정합니다.

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%", // Adjust the width as needed
    maxWidth: "600px", // Optional: Set a maximum width
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the overlay color and opacity
  },
};

function ModalComponent({ isOpen, onClose, message, name }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className={hahmlet.className}>
        <div className="py-5 px-5 bg-black text-white flex justify-between">
          <div className="text-2xl font-semibold">From. {name}</div>
          <button className="text-2xl" onClick={onClose}>
            ×
          </button>
        </div>
        <p className="py-3 text-lg">{message}</p>
      </div>
    </Modal>
  );
}

export default ModalComponent;
