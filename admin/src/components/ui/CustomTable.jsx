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

const CustomTable = ({ children, tableHead, isFetching }) => {
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
            {tableHead.map((thead) => (
              <Th key={thead.label}>{thead.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
