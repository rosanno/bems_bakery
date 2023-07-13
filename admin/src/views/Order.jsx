import { Box } from "@chakra-ui/react";
import React from "react";
import Header from "../components/ui/Header";

const Order = () => {
  return (
    <Box px={{ base: "4", xl: "32" }} mt="28">
      <Header heading="Order" subHeading="Manage order products" />
    </Box>
  );
};

export default Order;
