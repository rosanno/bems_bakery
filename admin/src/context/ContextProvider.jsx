import { useDisclosure } from "@chakra-ui/react";
import { createContext } from "react";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ModalContext.Provider value={{ isOpen, onOpen, onClose }}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
