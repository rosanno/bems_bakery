import React from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const Header = ({ heading, subHeading, itemCount, onClick, isButton = false }) => {
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Heading as="h1" fontSize="25px">
            {heading} {itemCount && <span>({itemCount})</span>}
          </Heading>
          <Text fontSize="sm" pt="1">
            {subHeading}
          </Text>
        </Box>
        {isButton && (
          <Button
            leftIcon={<AddIcon />}
            size="sm"
            style={{
              backgroundColor: "black",
              color: "white",
            }}
            onClick={onClick}
          >
            Add new
          </Button>
        )}
      </Flex>
    </>
  );
};

export default Header;
