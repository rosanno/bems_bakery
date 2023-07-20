import React, { useContext } from "react";
import CustomDialog from "./ui/CustomDialog";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

import { DialogContext } from "../context/DialogContextProvider";
import { resetId } from "../features/idsSlice";

const ConfirmationDialog = ({ heading, subHeading, deleteData, id }) => {
  const { onClose } = useContext(DialogContext);
  const dispatch = useDispatch();
  const toast = useToast();

  const onDelete = async () => {
    const res = await deleteData({ id: id });

    if (res?.data) {
      toast({
        title: `${subHeading} ${res?.data?.message}`,
        status: "success",
        position: "top",
        isClosable: true,
      });
      onClose();
      dispatch(resetId());
    } else {
      toast({
        title: "Something went wrong",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <CustomDialog header={heading} onDelete={onDelete}>
      Are you sure? You want to delete {subHeading}
    </CustomDialog>
  );
};

export default ConfirmationDialog;
