import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #ff4c4c;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ff0000;
  }
`;

const Popup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Overlay>
      <PopupContainer>
        <h2>Popup</h2>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </PopupContainer>
    </Overlay>
  );
};

export default Popup;
