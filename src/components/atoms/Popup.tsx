import { Overlay, Modal, CloseButton } from "./Popup.styled";

interface TPPopup {
  children: React.ReactNode;
  onClose: () => void;
}

const Popup: React.FC<TPPopup> = ({ children, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </Modal>
    </Overlay>
  );
};

export default Popup;
