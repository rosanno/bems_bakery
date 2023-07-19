import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useUpdateUserMutation } from "../services/bakeryApi";

const ProfileForm = ({ data }) => {
  const toast = useToast();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (data?.user) {
      setValue("name", data?.user?.name);
      setValue("email", data?.user?.email);
    }
  }, [data?.user]);

  const onSubmit = async (data) => {
    const res = await updateUser(data);

    if (res?.data) {
      toast({
        title: `${res?.data?.message}`,
        status: "success",
        position: "top",
        isClosable: true,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel fontSize={"sm"} fontWeight={"normal"} textColor={"gray.600"}>
          Name
        </FormLabel>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "This field is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters long",
            },
          }}
          render={({ field }) => (
            <Input size={"md"} borderRadius={"md"} width={"lg"} type="text" {...field} />
          )}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <FormControl mt={"4"} isInvalid={!!errors.email}>
        <FormLabel fontSize={"sm"} fontWeight={"normal"} textColor={"gray.600"}>
          Email
        </FormLabel>
        <Controller
          name="email"
          defaultValue=""
          control={control}
          rules={{
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => (
            <Input size={"md"} borderRadius={"md"} width={"lg"} type="email" {...field} />
          )}
        />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        isLoading={isLoading}
        loadingText="saving..."
        colorScheme="red"
        mt={"5"}
        size={"md"}
      >
        Save
      </Button>
    </form>
  );
};

export default ProfileForm;
