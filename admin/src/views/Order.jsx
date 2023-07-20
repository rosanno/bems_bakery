import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
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
  Text,
  Tr,
} from "@chakra-ui/react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import moment from "moment";

import Header from "../components/ui/Header";
import { useDeleteOrderFromListMutation, useGetOrderListQuery } from "../services/bakeryApi";
import CustomTable from "../components/ui/CustomTable";
import OrderModal from "../components/OrderModal";
import { ModalContext } from "../context/ContextProvider";
import { setId } from "../features/idsSlice";
import Pagination from "../components/ui/Pagination";
import { BsSearch } from "react-icons/bs";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { DialogContext } from "../context/DialogContextProvider";

const tableHead = [
  {
    label: "Customer",
  },
  {
    label: "Product",
  },
  {
    label: "Price",
  },
  {
    label: "Address",
  },
  {
    label: "Order Date",
  },
  {
    label: "Payment Status",
  },
  {
    label: "",
  },
];

const Order = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [subHeading, setSubHeading] = useState("");

  const orderId = useSelector((state) => state.ids.id);
  const { data: orderList, isFetching } = useGetOrderListQuery({ page, search });
  const [deleteOrder] = useDeleteOrderFromListMutation();
  const { onOpen } = useContext(ModalContext);
  const { onOpen: onDialogOpen } = useContext(DialogContext);

  const onOpenModal = (productId, status) => {
    setPaymentStatus(status);
    dispatch(setId({ id: productId }));
    onOpen();
  };

  const handleDelete = (orderId, orderItem) => {
    setSubHeading(orderItem);
    dispatch(setId({ id: orderId }));
    onDialogOpen();
  };

  return (
    <>
      <ConfirmationDialog
        heading="Delete Customer Order"
        subHeading={subHeading}
        deleteData={deleteOrder}
        id={orderId}
      />

      <OrderModal status={paymentStatus} setPaymentStatus={setPaymentStatus} />
      <Box px={{ base: "4", xl: "32" }} mt="28">
        <Header heading="Order" subHeading="Manage order products" />

        <Divider mt="2" />

        <Box mt="10">
          <Box as="div" my="5">
            <InputGroup width={"80"} size={"sm"}>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                borderRadius={"md"}
                placeholder="Search orders by customer name..."
              />
              <InputRightElement textColor={"gray.500"}>
                <BsSearch />
              </InputRightElement>
            </InputGroup>
          </Box>
          <CustomTable
            tableHead={tableHead}
            isFetching={isFetching}
            data={orderList?.data?.length}
            label="Customer not found"
          >
            {orderList?.data.map((order) => (
              <Tr key={order.id}>
                <Td fontSize="sm" textColor="gray.600">
                  {order.customer.firstName} {order.customer.lastName}
                </Td>
                <Td fontSize="sm" textColor="gray.600">
                  {order.orderItem} ({order.quantity})
                </Td>
                <Td fontSize="sm" textColor="gray.600">
                  ₱{order.totalPrice}
                </Td>
                <Td fontSize="sm" textColor="gray.600">
                  {order.customer.address}
                </Td>
                <Td fontSize="sm" textColor="gray.600">
                  {moment(order.createdAt).format("MMMM Do YYYY")}
                </Td>
                <Td>
                  <Badge colorScheme={order.status === "Paid" ? "green" : "gray"}>
                    {order.status}
                  </Badge>
                </Td>
                <Td isNumeric>
                  <Menu>
                    <MenuButton bg={"gray.100"} p={"1"} borderRadius={"md"}>
                      <AiOutlineEllipsis />
                    </MenuButton>
                    <MenuList>
                      <MenuItem fontSize="xs" onClick={() => onOpenModal(order.id, order.status)}>
                        <EditIcon fontSize="sm" mr="1" />
                        Edit
                      </MenuItem>
                      <MenuItem
                        fontSize="xs"
                        onClick={() => handleDelete(order.id, order.orderItem)}
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
          {orderList?.totalPages !== 1 && orderList?.totalPages !== 0 && (
            <Box
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Pagination totalPages={orderList?.totalPages} setPage={setPage} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Order;
