import {
  Box,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Td,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import moment from "moment";

import CustomTable from "../components/ui/CustomTable";
import { useDeleteIngredientMutation, useGetIngredientsQuery } from "../services/bakeryApi";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../features/idsSlice";
import { ModalContext } from "../context/ContextProvider";
import { DialogContext } from "../context/DialogContextProvider";
import Header from "../components/ui/Header";
import IngredientsModal from "../components/IngredientsModal";
import ConfirmationDialog from "../components/ConfirmationDialog";

const Ingredients = () => {
  const { onOpen } = useContext(ModalContext);
  const { onOpen: onDialogOpen } = useContext(DialogContext);
  const ingredientId = useSelector((state) => state.ids._id);
  const id = ingredientId?.payload;
  const { data, isFetching } = useGetIngredientsQuery();
  const [deleteIngredient] = useDeleteIngredientMutation();
  const dispatch = useDispatch();
  const [subHeading, setSubHeading] = useState("");

  const handleUpdate = (ingredientId) => {
    dispatch(setId(ingredientId));
    onOpen();
  };

  const handleDelete = (ingredientId, ingredient) => {
    setSubHeading(ingredient);
    dispatch(setId(ingredientId));
    onDialogOpen();
  };

  const onClick = () => {
    onOpen();
  };

  return (
    <>
      <IngredientsModal />
      <ConfirmationDialog
        heading="Delete Ingredient"
        subHeading={subHeading}
        deleteData={deleteIngredient}
        id={id}
      />
      <Box px={{ base: "4", xl: "32" }} mt="28">
        <Header
          heading="Ingredients"
          subHeading="Manage ingredients for your products"
          onClick={onClick}
        />

        <Divider mt="2" />

        <Box mt="10">
          {isFetching ? (
            <Flex justifyContent="center">
              <Spinner size="lg" />
            </Flex>
          ) : (
            <CustomTable>
              {data?.ingredients?.map((ingredient) => (
                <Tr key={ingredient._id}>
                  <Td fontSize="sm" fontWeight="medium">
                    {ingredient.name}
                  </Td>
                  <Td fontSize="sm" fontWeight="medium">
                    {moment(ingredient.updatedAt).format("MMM Do YY")}
                  </Td>
                  <Td isNumeric>
                    <Menu>
                      <MenuButton>
                        <AiOutlineEllipsis />
                      </MenuButton>
                      <MenuList>
                        <MenuItem fontSize="xs" onClick={() => handleUpdate(ingredient._id)}>
                          <EditIcon fontSize="sm" mr="1" />
                          Edit
                        </MenuItem>
                        <MenuItem
                          fontSize="xs"
                          onClick={() => handleDelete(ingredient._id, ingredient.name)}
                        >
                          <DeleteIcon mr="1" fontSize="sm" />
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </CustomTable>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Ingredients;
