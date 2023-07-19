import { Box, Card, CardBody, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import Header from "../components/ui/Header";
import {
  useGetMonthlyRevenueQuery,
  useGetSalesCountQuery,
  useGetTotalRevenueQuery,
} from "../services/bakeryApi";
import MonthlyRevenueChart from "../components/MonthlyRevenueChart";
import Progress from "../components/ui/Progress";

const Overview = () => {
  const { data } = useGetTotalRevenueQuery();
  const { data: result, isFetching } = useGetSalesCountQuery();
  const { data: revenue } = useGetMonthlyRevenueQuery();

  return (
    <>
      {isFetching && <Progress />}
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

          <Divider mt="5" mb="5" />

          <Box>
            <Card shadow={"md"}>
              <CardBody py={"5"}>
                <Heading fontSize={"md"} fontWeight={"medium"} mb={"10"}>
                  Monthly Revenue
                </Heading>
                <MonthlyRevenueChart data={revenue?.monthlyRevenue} />
              </CardBody>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Overview;
