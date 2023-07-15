import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Menu, MenuButton, MenuItem, MenuList, Td, Tr } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { AiOutlineEllipsis } from "react-icons/ai";
import moment from "moment";

import { ModalContext } from "../context/ContextProvider";
import CategoryModal from "../components/CategoryModal";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../services/bakeryApi";
import { setId } from "../features/idsSlice";
import { DialogContext } from "../context/DialogContextProvider";
import ConfirmationDialog from "../components/ConfirmationDialog";
import Header from "../components/ui/Header";
import CustomTable from "../components/ui/CustomTable";

const Category = () => {
  const { onOpen } = useContext(ModalContext);
  const { onOpen: onDialogOpen } = useContext(DialogContext);
  const { data, isFetching } = useGetCategoriesQuery();
  const categoryId = useSelector((state) => state.ids._id);
  const id = categoryId?.payload;
  const [deleteData] = useDeleteCategoryMutation();
  const dispatch = useDispatch();
  const [subHeading, setSubHeading] = useState("");

  const handleUpdate = (categoryId) => {
    dispatch(setId(categoryId));
    onOpen();
  };

  const handleDelete = (categoryId, category) => {
    setSubHeading(category);
    dispatch(setId(categoryId));
    onDialogOpen();
  };

  const onClick = () => {
    onOpen();
  };

  return (
    <>
      <CategoryModal />
      <ConfirmationDialog
        heading="Delete Category"
        subHeading={subHeading}
        deleteData={deleteData}
        id={id}
      />
      <Box px={{ base: "4", xl: "32" }} mt="28">
        <Header
          heading="Categories"
          subHeading="Manage categories for your products"
          itemCount={data?.categories?.length}
          onClick={onClick}
        />

        <Divider mt="2" />

        <Box mt="10">
          <CustomTable isFetching={isFetching}>
            {data?.categories?.map((category) => (
              <Tr key={category._id}>
                <Td fontSize="sm" fontWeight="medium">
                  {category.name}
                </Td>
                <Td fontSize="sm" fontWeight="medium">
                  {moment(category.updatedAt).format("MMM Do YY")}
                </Td>
                <Td isNumeric>
                  <Menu>
                    <MenuButton>
                      <AiOutlineEllipsis />
                    </MenuButton>
                    <MenuList>
                      <MenuItem fontSize="xs" onClick={() => handleUpdate(category._id)}>
                        <EditIcon fontSize="sm" mr="1" />
                        Edit
                      </MenuItem>
                      <MenuItem
                        fontSize="xs"
                        onClick={() => handleDelete(category._id, category.name)}
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
        </Box>
      </Box>
    </>
  );
};

export default Category;
