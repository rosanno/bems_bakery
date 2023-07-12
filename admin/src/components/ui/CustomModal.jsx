import { useRef } from "react";
import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useContext } from "react";
import { ModalContext } from "../../context/ContextProvider";

const CustomModal = ({ children, heading, handleClose }) => {
  const { isOpen } = useContext(ModalContext);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{heading}</ModalHeader>
          <ModalCloseButton />
          {children}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
