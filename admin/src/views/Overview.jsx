import {
  Box,
  Divider,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
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
            <Stat>
              <StatLabel>Total Revenue</StatLabel>
              <StatNumber>₱{data?.totalRevenue}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Sales</StatLabel>
              <StatNumber>+{result?.salesCount}</StatNumber>
            </Stat>
          </Flex>

          <Divider mt="5" mb="5" />

          <Box
            sx={{
              backgroundColor: "#F7FAFC",
              paddingY: 5,
              paddingX: 10,
            }}
          >
            <Heading fontSize={"md"} fontWeight={"medium"} mb={"10"}>
              Monthly Revenue
            </Heading>
            <MonthlyRevenueChart data={revenue?.monthlyRevenue} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Overview;
