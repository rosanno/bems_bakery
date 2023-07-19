import { useForm } from "react-hook-form";
import { Box, Button, Divider, Flex, Heading, Text, useToast } from "@chakra-ui/react";

import {
  useCreateProductMutation,
  useGetCategoriesQuery,
  useGetIngredientsQuery,
} from "../services/bakeryApi";
import Progress from "../components/ui/Progress";
import useImageUpload from "../hooks/useImageUpload";
import SingleSelect from "../components/ui/SingleSelect";
import CustomInput from "../components/ui/CustomInput";
import MultiSelect from "../components/ui/MultiSelect";
import CustomTextArea from "../components/ui/CustomTextArea";
import ImageForm from "../components/ui/ImageForm";

const CreateProduct = () => {
  const toast = useToast();
  const { data } = useGetCategoriesQuery({ isQueryParams: false });
  const { data: result } = useGetIngredientsQuery({ isQueryParams: false });
  const {
    fileInputRef,
    previewImage,
    setPreviewImage,
    handleSelectedFile,
    handleSelectFile,
    onDelete,
  } = useImageUpload();
  const [create, { isLoading }] = useCreateProductMutation();
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "",
      ingredients: "",
    },
  });

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      image: previewImage,
    };
    const res = await create(newData);
    if (res?.data?.product) {
      toast({
        title: "Product added",
        status: "success",
        position: "top",
        isClosable: true,
      });
      setPreviewImage(null);
      reset();
    }
  };

  let options = result?.ingredients?.map((ingredient) => ({
    value: ingredient._id,
    label: ingredient.name,
  }));

  console.log(errors);

  return (
    <>
      {isLoading && <Progress />}
      <Box px={{ base: "4", xl: "32" }} mt="24">
        <Box>
          <Heading as="h1" fontSize="25px">
            Create product
          </Heading>
          <Text fontSize="sm" pt="1">
            Add a new product
          </Text>
        </Box>

        <Divider mt="2" />

        <ImageForm
          previewImage={previewImage}
          onDelete={onDelete}
          handleSelectedFile={handleSelectedFile}
          handleSelectFile={handleSelectFile}
          ref={fileInputRef}
        />

        <Divider mt="2" />

        <Box mt="7">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex alignItems="center" gap="3">
              <CustomInput
                label="Product Name"
                name="name"
                type="text"
                control={control}
                errors={errors?.name}
                rules={{ required: "Product Name is required" }}
              />
              <CustomInput
                label="Price"
                name="price"
                type="number"
                control={control}
                errors={errors?.price}
                rules={{
                  required: "Price is required",
                  min: 0,
                  max: 1000,
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Invalid Price format",
                  },
                }}
              />
              <SingleSelect
                label="Category"
                name="category"
                placeholder="Select category"
                control={control}
                data={data}
              />
            </Flex>
            <Box mt="5">
              <MultiSelect label="Ingredients" control={control} options={options} />
              <Box mt="5">
                <CustomTextArea
                  label="Description"
                  name="description"
                  control={control}
                  errors={errors?.description}
                  rules={{
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters long",
                    },
                    maxLength: {
                      value: 200,
                      message: "Description must not exceed 200 characters",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box mt="3" mb="3">
              <Button
                type="submit"
                style={{
                  backgroundColor: "black",
                }}
                textColor="white"
              >
                Create
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default CreateProduct;
