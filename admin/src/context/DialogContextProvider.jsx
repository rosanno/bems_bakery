import { useDisclosure } from "@chakra-ui/react";
import { createContext } from "react";

export const DialogContext = createContext();

const DialogProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DialogContext.Provider value={{ isOpen, onOpen, onClose }}>{children}</DialogContext.Provider>
  );
};

export default DialogProvider;
