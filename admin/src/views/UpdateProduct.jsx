import { Box, Button, Divider, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import ImageForm from "../components/ui/ImageForm";
import useImageUpload from "../hooks/useImageUpload";
import CustomInput from "../components/ui/CustomInput";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useGetCategoriesQuery,
  useGetIngredientsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../services/bakeryApi";
import SingleSelect from "../components/ui/SingleSelect";
import { useEffect } from "react";
import MultiSelect from "../components/ui/MultiSelect";
import CustomTextArea from "../components/ui/CustomTextArea";
import Progress from "../components/ui/Progress";

const UpdateProduct = () => {
  const { productId } = useParams();
  const toast = useToast();
  const { data: product, isFetching } = useGetProductQuery(productId);
  const { data: results } = useGetCategoriesQuery({ isQueryParams: false });
  const { data: result } = useGetIngredientsQuery({ isQueryParams: false });
  const [update, { isLoading }] = useUpdateProductMutation();
  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      category: "",
      ingredients: "",
      description: "",
    },
  });
  const {
    fileInputRef,
    previewImage,
    setPreviewImage,
    handleSelectedFile,
    handleSelectFile,
    onDelete,
  } = useImageUpload();

  let options = result?.ingredients?.map((ingredient) => ({
    value: ingredient._id,
    label: ingredient.name,
  }));

  let ingredients = product?.result?.ingredients?.map((ingredient) => ({
    value: ingredient._id,
    label: ingredient.name,
  }));

  useEffect(() => {
    if (product && product) {
      setPreviewImage(product?.result?.imageURL);
      setValue("name", product?.result?.name);
      setValue("price", product?.result?.price);
      setValue("category", product?.result?.category?._id);
      setValue("ingredients", ingredients);
      setValue("description", product?.result?.description);
    }
    console.log("product data");
  }, [product, setPreviewImage, setValue]);

  const onSubmit = async (data) => {
    const result = await update({ productId, data });

    if (result?.data?.product) {
      toast({
        title: "Updated successfully",
        status: "success",
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <>
      {isFetching && <Progress />}
      {isLoading && <Progress />}
      <Box px={{ base: "4", xl: "32" }} mt="24">
        <Box>
          <Heading as="h1" fontSize="25px">
            Update product
          </Heading>
          <Text fontSize="sm" pt="1">
            Manage your product
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
                data={results}
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
                      value: 500,
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
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default UpdateProduct;
