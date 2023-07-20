import { useContext, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { DialogContext } from "../../context/DialogContextProvider";
import { useDispatch } from "react-redux";
import { resetId } from "../../features/idsSlice";

const CustomDialog = ({ children, header, onDelete }) => {
  const { isOpen, onClose } = useContext(DialogContext);
  const dispatch = useDispatch();
  const cancelRef = useRef();

  const onCancel = () => {
    onClose();
    dispatch(resetId());
  };

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>

            <AlertDialogBody>{children}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCancel}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CustomDialog;
