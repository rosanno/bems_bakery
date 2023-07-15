import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Box,
  Divider,
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
import { useGetOrderListQuery } from "../services/bakeryApi";
import CustomTable from "../components/ui/CustomTable";
import OrderModal from "../components/OrderModal";
import { ModalContext } from "../context/ContextProvider";
import { setId } from "../features/idsSlice";

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
  const { data: orderList, isFetching } = useGetOrderListQuery();
  const { onOpen } = useContext(ModalContext);
  const productId = useSelector((state) => state.ids._id);
  const id = productId?.payload;
  const [paymentStatus, setPaymentStatus] = useState("");

  const onOpenModal = (productId, status) => {
    setPaymentStatus(status);
    dispatch(setId(productId));
    onOpen();
  };

  return (
    <>
      <OrderModal status={paymentStatus} setPaymentStatus={setPaymentStatus} />
      <Box px={{ base: "4", xl: "32" }} mt="28">
        <Header heading="Order" subHeading="Manage order products" />

        <Divider mt="2" />

        <Box mt="10">
          <CustomTable tableHead={tableHead} isFetching={isFetching}>
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
                    <MenuButton>
                      <AiOutlineEllipsis />
                    </MenuButton>
                    <MenuList>
                      <MenuItem fontSize="xs" onClick={() => onOpenModal(order.id, order.status)}>
                        <EditIcon fontSize="sm" mr="1" />
                        Edit
                      </MenuItem>
                      <MenuItem fontSize="xs" onClick={() => {}}>
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

export default Order;
