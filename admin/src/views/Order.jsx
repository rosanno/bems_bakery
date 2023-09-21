import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import moment from "moment";

import Header from "../components/ui/Header";
import {
  useDeleteOrderFromListMutation,
  useGetOrderListQuery,
  useUpdateDeliveryStatusMutation,
} from "../services/bakeryApi";
import OrderModal from "../components/OrderModal";
import { ModalContext } from "../context/ContextProvider";
import { setId } from "../features/idsSlice";
import Pagination from "../components/ui/Pagination";
import { BsSearch } from "react-icons/bs";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { DialogContext } from "../context/DialogContextProvider";
import { useEffect } from "react";

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
    label: "Delivery Status",
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
  const [deliveryStatus, setdeliveryStatus] = useState(false);
  const [subHeading, setSubHeading] = useState("");
  const [productId, setProductId] = useState("null");

  const orderId = useSelector((state) => state.ids.id);
  const { data: orderList, isFetching } = useGetOrderListQuery({
    page,
    search,
  });
  const [deleteOrder] = useDeleteOrderFromListMutation();
  const { onOpen } = useContext(ModalContext);
  const { onOpen: onDialogOpen } = useContext(DialogContext);
  const [updateDeliveryStatus] = useUpdateDeliveryStatusMutation();
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    document.title = "Admin | Orders";

    return () => {
      document.title = "Admin";
    };
  }, []);

  useEffect(() => {
    const update = async () => {
      await updateDeliveryStatus({ id: productId, deliveryStatus });
    };

    deliveryStatus && update();
  }, [deliveryStatus]);

  const onOpenModal = (orderId, status) => {
    setPaymentStatus(status);
    dispatch(setId({ id: orderId }));
    onOpen();
  };

  const handleDelete = (orderId, orderItem, customerId) => {
    setCustomerId(customerId);
    setSubHeading(orderItem);
    dispatch(setId({ id: orderId }));
    onDialogOpen();
  };

  const updateDelivery = async (orderId) => {
    setdeliveryStatus(true);
    setProductId(orderId);
  };

  return (
    <>
      <ConfirmationDialog
        heading="Delete Customer Order"
        subHeading={subHeading}
        deleteData={deleteOrder}
        id={orderId}
        customerId={customerId}
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
          <TableContainer border="1px" borderColor="gray.100" borderRadius="6">
            <Table variant="simple">
              {isFetching && (
                <TableCaption>
                  <Spinner size="lg" />
                </TableCaption>
              )}
              {orderList?.data?.length === 0 && !isFetching && (
                <TableCaption>Data not found</TableCaption>
              )}
              <Thead>
                <Tr>
                  {tableHead.map((thead) => (
                    <Th key={thead.label}>{thead.label}</Th>
                  ))}
                </Tr>
              </Thead>
              {!isFetching && (
                <Tbody>
                  {orderList?.data.map((order) =>
                    order.orderItems.map((item) => (
                      <Tr key={item._id}>
                        <Td fontSize="sm" textColor="gray.600">
                          {order.customer.name}
                        </Td>
                        <Td fontSize="sm" textColor="gray.600">
                          {item.product.name} ({item.quantity})
                        </Td>
                        <Td fontSize="sm" textColor="gray.600">
                          ₱{item.total}
                        </Td>
                        <Td fontSize="sm" textColor="gray.600">
                          {order.customer.addresses[0].address}
                        </Td>
                        <Td fontSize="sm" textColor="gray.600">
                          {moment(order.createdAt).format("MMMM Do YYYY")}
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={
                              item.paymentStatus === "Paid" ? "green" : "gray"
                            }
                          >
                            {item.paymentStatus}
                          </Badge>
                        </Td>
                        <Td>
                          <Box display={"flex"} alignItems={"center"} gap={"2"}>
                            <Badge
                              colorScheme={item.isDelivered ? "green" : "gray"}
                            >
                              {item.isDelivered ? "Delivered" : "Pending"}
                            </Badge>
                            {!item.isDelivered ? (
                              <IconButton
                                onClick={() => updateDelivery(item._id)}
                                aria-label="check icon"
                                size={"xs"}
                                icon={<AiOutlineCheckCircle size={"18px"} />}
                              />
                            ) : null}
                          </Box>
                        </Td>
                        <Td isNumeric>
                          <Menu>
                            <MenuButton
                              bg={"gray.100"}
                              p={"1"}
                              borderRadius={"md"}
                            >
                              <AiOutlineEllipsis />
                            </MenuButton>
                            <MenuList>
                              <MenuItem
                                fontSize="xs"
                                onClick={() =>
                                  onOpenModal(item._id, item.paymentStatus)
                                }
                              >
                                <EditIcon fontSize="sm" mr="1" />
                                update
                              </MenuItem>
                              <MenuItem
                                fontSize="xs"
                                onClick={() =>
                                  handleDelete(
                                    item._id,
                                    item.product.name,
                                    order.customer._id
                                  )
                                }
                              >
                                <DeleteIcon mr="1" fontSize="sm" />
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              )}
            </Table>
          </TableContainer>
          {orderList?.totalPages !== 1 && orderList?.totalPages !== 0 && (
            <Box
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Pagination
                totalPages={orderList?.totalPages}
                setPage={setPage}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Order;
