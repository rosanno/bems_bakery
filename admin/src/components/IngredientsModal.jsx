import { useContext, useRef } from "react";
import { Button, FormControl, FormLabel, Input, ModalBody, ModalFooter } from "@chakra-ui/react";

import CustomModal from "./ui/CustomModal";
import { ModalContext } from "../context/ContextProvider";
import useCreateUpdate from "../hooks/useCreateUpdate";
import {
  useCreateIngredientMutation,
  useGetIngredientQuery,
  useUpdateIngredientMutation,
} from "../services/bakeryApi";
import { useSelector } from "react-redux";

const IngredientsModal = () => {
  const initialRef = useRef(null);
  const { onClose, isOpen } = useContext(ModalContext);
  const ingredientId = useSelector((state) => state.ids._id);
  const id = ingredientId?.payload;
  const [create, { isLoading: isCreated }] = useCreateIngredientMutation();
  const [update, { isLoading }] = useUpdateIngredientMutation();
  const { data } = useGetIngredientQuery({ id }, { skip: !id });
  const ingredient = data?.ingredient?.name;
  const { name, setName, onCreate, onUpdate, handleClose } = useCreateUpdate(
    isOpen,
    onClose,
    id,
    ingredient,
    create,
    update
  );

  return (
    <CustomModal heading="Add Ingredients" handleClose={handleClose}>
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Ingredient</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={initialRef}
            placeholder="Add ingredient"
            fontSize="sm"
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        {ingredientId?.payload ? (
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

export default IngredientsModal;
