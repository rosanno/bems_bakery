import { useRef } from "react";
import { useSelector } from "react-redux";
import { Button, FormControl, FormLabel, Input, ModalBody, ModalFooter } from "@chakra-ui/react";

import CustomModal from "./ui/CustomModal";
import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../services/bakeryApi";
import { ModalContext } from "../context/ContextProvider";
import { useContext } from "react";
import useCreateUpdate from "../hooks/useCreateUpdate";

const CategoryModal = () => {
  const initialRef = useRef(null);
  const { onClose, isOpen } = useContext(ModalContext);
  const [create, { isLoading: isCreated }] = useCreateCategoryMutation();
  const categoryId = useSelector((state) => state.ids._id);
  const id = categoryId?.payload;
  const { data } = useGetCategoryQuery({ id: categoryId?.payload }, { skip: !categoryId });
  const [update, { isLoading }] = useUpdateCategoryMutation();
  const { name, setName, onCreate, onUpdate, handleClose } = useCreateUpdate(
    isOpen,
    onClose,
    id,
    data?.category?.name,
    create,
    update,
    true
  );

  return (
    <CustomModal heading="Create category" onCreate={onCreate} handleClose={handleClose}>
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={initialRef}
            placeholder="Add category"
            fontSize="sm"
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        {categoryId?.payload ? (
          <Button
            onClick={onUpdate}
            colorScheme="blue"
            isLoading={isLoading}
            loadingText="updating..."
            mr={3}
            style={{
              backgroundColor: "black",
            }}
          >
            Update
          </Button>
        ) : (
          <Button
            onClick={onCreate}
            colorScheme="blue"
            isLoading={isCreated}
            loadingText="adding..."
            mr={3}
            style={{
              backgroundColor: "black",
            }}
          >
            Create
          </Button>
        )}
      </ModalFooter>
    </CustomModal>
  );
};

export default CategoryModal;
