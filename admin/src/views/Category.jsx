import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr,
} from "@chakra-ui/react";
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
import Pagination from "../components/ui/Pagination";
import { BsSearch } from "react-icons/bs";

const tableHead = [
  {
    label: "Ingredient",
  },
  {
    label: "Created Date",
  },
  {
    label: "Updated Date",
  },
  {
    label: "",
  },
];

const Category = () => {
  const { onOpen } = useContext(ModalContext);
  const { onOpen: onDialogOpen } = useContext(DialogContext);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isFetching } = useGetCategoriesQuery({ page, search, isQueryParams: true });
  const categoryId = useSelector((state) => state.ids.id);
  const [deleteData] = useDeleteCategoryMutation();
  const dispatch = useDispatch();
  const [subHeading, setSubHeading] = useState("");

  const handleUpdate = (categoryId) => {
    dispatch(setId({ id: categoryId }));
    onOpen();
  };

  const handleDelete = (categoryId, category) => {
    setSubHeading(category);
    dispatch(setId({ id: categoryId }));
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
        id={categoryId}
      />
      <Box px={{ base: "4", xl: "32" }} mt="28">
        <Header
          heading="Categories"
          subHeading="Manage categories for your products"
          itemCount={data?.categories?.length}
          onClick={onClick}
          isButton
        />

        <Divider mt="2" />

        <Box mt="10">
          <Box as="div" my="5">
            <InputGroup width={"80"} size={"sm"}>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                borderRadius={"md"}
                placeholder="Search category..."
              />
              <InputRightElement textColor={"gray.500"}>
                <BsSearch />
              </InputRightElement>
            </InputGroup>
          </Box>
          <CustomTable
            tableHead={tableHead}
            isFetching={isFetching}
            data={data?.categories?.length}
            label="Category not found"
          >
            {data?.categories?.map((category) => (
              <Tr key={category._id}>
                <Td fontSize="sm" textColor="gray.600">
                  {category.name}
                </Td>
                <Td fontSize="sm" textColor="gray.600">
                  {moment(category.createdAt).format("MMM Do YY")}
                </Td>
                <Td fontSize="sm" textColor="gray.600">
                  {moment(category.updatedAt).format("MMM Do YY")}
                </Td>
                <Td isNumeric>
                  <Menu>
                    <MenuButton bg={"gray.100"} p={"1"} borderRadius={"md"}>
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
          {data?.totalPages !== 1 && data?.totalPages !== 0 && (
            <Box
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Pagination totalPages={data?.totalPages} setPage={setPage} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Category;
