import { Box, CircularProgress } from "@chakra-ui/react";

const Progress = () => {
  return (
    <>
      <Box position="fixed" top="50%" left="50%" zIndex="60">
        <CircularProgress isIndeterminate color="green.300" />
      </Box>
      <Box
        as="div"
        position="fixed"
        inset="0"
        bg="blackAlpha.600"
        backdropFilter="auto"
        backdropBlur="sm"
        zIndex="50"
      />
    </>
  );
};

export default Progress;
