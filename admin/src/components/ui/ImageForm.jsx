import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, IconButton, Image, Input, useImage } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import { BsCardImage, BsImages } from "react-icons/bs";

const ImageForm = forwardRef(({ previewImage, onDelete, handleSelectedFile, handleSelectFile }, ref) => {
  return (
    <Box mt="7">
      <Heading as="h3" fontSize="md" fontWeight="medium">
        Product images
      </Heading>
      <Box
        boxSize="56"
        position="relative"
        borderRadius="md"
        backgroundColor="gray.200"
        overflow="hidden"
        mt="3"
      >
        {previewImage ? (
          <Image
            src={previewImage}
            alt="Product preview"
            objectFit="contain"
            width="full"
            height="full"
          />
        ) : (
          <Flex justifyContent="center" alignItems="center" height="full">
            <BsCardImage size="30px" />
          </Flex>
        )}
        {previewImage && (
          <Box onClick={onDelete} position="absolute" top="2" right="2">
            <IconButton size="sm" colorScheme="red" icon={<DeleteIcon />} />
          </Box>
        )}
      </Box>
      <Box my="4">
        <Input ref={ref} type="file" hidden onChange={handleSelectedFile} />
        <Button onClick={handleSelectFile} leftIcon={<BsImages />} fontSize="sm">
          Upload an image
        </Button>
      </Box>
    </Box>
  );
});

export default ImageForm;
