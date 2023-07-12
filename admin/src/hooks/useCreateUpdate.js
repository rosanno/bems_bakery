import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetId } from "../features/idsSlice";

const useCreateUpdate = (isOpen, onClose, id, data, create, update, isCategory) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const path = isCategory ? { category: name } : { ingredient: name };

  useEffect(() => {
    if (isOpen && id) {
      setName(data || "");
    }
  }, [data, isOpen, id]);

  const onCreate = async () => {
    const result = await create(path);

    if (result?.data) {
      onClose();
      setName("");
    }
  };

  const onUpdate = async () => {
    const result = await update({ id: id, name: name });

    if (result?.data) {
      setName("");
      dispatch(resetId());
      onClose();
    }
  };

  const handleClose = () => {
    if (name && id) {
      setName("");
      dispatch(resetId());
    }
    onClose();
  };

  return { name, setName, onCreate, onUpdate, handleClose };
};

export default useCreateUpdate;
