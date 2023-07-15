import {
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const CustomTable = ({ children, isFetching }) => {
  return (
    <TableContainer border="1px" borderColor="gray.100" borderRadius="6">
      <Table variant="simple">
        {isFetching && (
          <TableCaption>
            <Spinner size="lg" />
          </TableCaption>
        )}
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
