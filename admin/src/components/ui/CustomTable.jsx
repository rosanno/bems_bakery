import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

const CustomTable = ({ children }) => {
  return (
    <TableContainer border="1px" borderColor="gray.100" borderRadius="6">
      <Table variant="simple">
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
