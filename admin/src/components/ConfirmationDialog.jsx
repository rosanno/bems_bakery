import React, { useContext } from "react";
import CustomDialog from "./ui/CustomDialog";
import { useDispatch } from "react-redux";
import { DialogContext } from "../context/DialogContextProvider";
import { resetId } from "../features/idsSlice";

const ConfirmationDialog = ({ heading, subHeading, deleteData, id }) => {
  const { onClose } = useContext(DialogContext);
  const dispatch = useDispatch();

  const onDelete = async () => {
    await deleteData({ id: id });
    onClose();
    dispatch(resetId());
  };

  return (
    <CustomDialog header={heading} onDelete={onDelete}>
      Are you sure? You want to delete {subHeading}
    </CustomDialog>
  );
};

export default ConfirmationDialog;
