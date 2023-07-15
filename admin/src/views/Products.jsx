import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Box, Divider, Menu, MenuButton, MenuItem, MenuList, Td, Tr } from "@chakra-ui/react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import Header from "../components/ui/Header";
import { useDeleteProductMutation, useGetProductsQuery } from "../services/bakeryApi";
import { useContext, useState } from "react";
import { DialogContext } from "../context/DialogContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../features/idsSlice";
import ConfirmationDialog from "../components/ConfirmationDialog";
import CustomTable from "../components/ui/CustomTable";

const tableHead = [
  {
    label: "Product Name",
  },
  {
    label: "Category",
  },
  {
    label: "Price",
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

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productId = useSelector((state) => state.ids._id);
  const id = productId?.payload;
  const { data, isFetching } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const { onOpen } = useContext(DialogContext);
  const [subHeading, setSubHeading] = useState("");

  const onClick = () => {
    navigate("/create-product");
  };

  const handleDelete = (categoryId, product) => {
    setSubHeading(product);
    dispatch(setId(categoryId));
    onOpen();
  };

  return (
    <>
      <ConfirmationDialog
        heading="Delete Product"
        subHeading={subHeading}
        deleteData={deleteProduct}
        id={id}
      />

      <Box px={{ base: "4", xl: "32" }} mt="28">
        <Header
          heading="Products"
          subHeading="Manage your products"
          onClick={onClick}
          itemCount={data?.products?.length}
        />

        <Divider mt="2" />

        <Box mt="10">
          <CustomTable tableHead={tableHead} isFetching={isFetching}>
            {data?.products?.map((product) => (
              <Tr key={product._id}>
                <Td fontSize="sm" textColor="gray.600">
                  {product.name}
                </Td>
                <Td fontSize="sm" textColor="gray.600">
                  {product.category.name}
                </Td>
                <Td fontSize="sm" textColor="gray.600">
                  ₱{product.price}
                </Td>
                <Td fontSize="sm" textColor="gray.600">
                  {moment(product.createdAt).format("MMM Do YY")}
                </Td>
                <Td fontSize="sm" textColor="gray.600">
                  {moment(product.updatedAt).format("MMM Do YY")}
                </Td>
                <Td isNumeric>
                  <Menu>
                    <MenuButton>
                      <AiOutlineEllipsis />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        fontSize="xs"
                        onClick={() => navigate(`/edit-product/${product._id}`)}
                      >
                        <EditIcon fontSize="sm" mr="1" />
                        Edit
                      </MenuItem>
                      <MenuItem
                        fontSize="xs"
                        onClick={() => handleDelete(product._id, product.name)}
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

export default Products;
