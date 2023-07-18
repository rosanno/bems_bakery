import { Box, Card, CardBody, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import Header from "../components/ui/Header";
import { useGetSalesCountQuery, useGetTotalRevenueQuery } from "../services/bakeryApi";

const Overview = () => {
  const { data } = useGetTotalRevenueQuery();
  const { data: result } = useGetSalesCountQuery();

  return (
    <Box px={{ base: "4", xl: "32" }} mt="28">
      <Header heading="Dashboard" subHeading="Overview" />

      <Divider mt="2" />

      <Box mt={"10"}>
        <Flex width={"full"} alignItems={"center"} gap={"5"}>
          <Card width={"72"} height={"28"}>
            <CardBody display="flex" flexDirection={"column"} justifyContent={"center"}>
              <Heading fontSize={"md"} fontWeight={"medium"}>
                Total Revenue
              </Heading>
              <Text mt={"2"} fontSize={"2xl"} fontWeight={"bold"}>
                ₱{data?.totalRevenue}
              </Text>
            </CardBody>
          </Card>
          <Card width={"72"} height={"28"}>
            <CardBody display="flex" flexDirection={"column"} justifyContent={"center"}>
              <Heading fontSize={"md"} fontWeight={"medium"}>
                Sales
              </Heading>
              <Text mt={"2"} fontSize={"2xl"} fontWeight={"bold"}>
                +{result?.salesCount}
              </Text>
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </Box>
  );
};

export default Overview;
