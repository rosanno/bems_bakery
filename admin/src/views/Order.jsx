import {
  Box,
  Divider,
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

const Order = () => {
  const { data: orderList, isFetching } = useGetOrderListQuery();

  return (
    <Box px={{ base: "4", xl: "32" }} mt="28">
      <Header heading="Order" subHeading="Manage order products" />

      <Divider mt="2" />

      <Box mt="10">
        <TableContainer border="1px" borderColor="gray.100" borderRadius="md">
          <Table variant="simple">
            {isFetching && (
              <TableCaption>
                <Spinner size="lg" />
              </TableCaption>
            )}
            <Thead>
              <Tr>
                <Th>Customer</Th>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Status</Th>
                <Th>Address</Th>
                <Th isNumeric></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderList?.data.map((order) => (
                <Tr key={order.id} fontSize="sm" fontWeight="medium">
                  <Td>
                    {order.customer.firstName} {order.customer.lastName}
                  </Td>
                  <Td>{order.orderItem.name}</Td>
                  <Td>₱{order.totalPrice}</Td>
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
                  <Td>{order.customer.address}</Td>
                  <Td isNumeric></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Order;
