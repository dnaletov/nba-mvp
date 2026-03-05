import { Overlay, Modal, CloseButton } from "./Popup.styled";

interface TPPopup {
  children: React.ReactNode;
  onClose: () => void;
}

const Popup: React.FC<TPPopup> = ({ children, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </CloseButton>
        {children}
      </Modal>
    </Overlay>
  );
};

export default Popup;
