import {
  Box,
  Divider,
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
import Header from "../components/ui/Header";
import { useGetOrderListQuery } from "../services/bakeryApi";
import { AiOutlineEllipsis } from "react-icons/ai";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import moment from "moment";
import CustomTable from "../components/ui/CustomTable";

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
  const { data: orderList, isFetching } = useGetOrderListQuery();

  return (
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
                {order.orderItem.name}
              </Td>
              <Td fontSize="sm" textColor="gray.600">
                ₱{order.totalPrice}
              </Td>
              <Td fontSize="sm" textColor="gray.600">
                {order.customer.address}
              </Td>
              <Td fontSize="sm" textColor="gray.600">
                {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </Td>
              <Td>
                <Text
                  as="p"
                  backgroundColor="orange.300"
                  width="max"
                  py="0.5"
                  px="2"
                  fontSize="xs"
                  textColor="gray.200"
                  rounded="full"
                >
                  {order.status}
                </Text>
              </Td>
              <Td isNumeric>
                <Menu>
                  <MenuButton>
                    <AiOutlineEllipsis />
                  </MenuButton>
                  <MenuList>
                    <MenuItem fontSize="xs" onClick={() => {}}>
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
  );
};

export default Order;
