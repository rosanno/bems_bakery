import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useUpdateUserMutation } from "../services/bakeryApi";

const PasswordForm = () => {
  const toast = useToast();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await updateUser(data);
    if (res?.data) {
      toast({
        title: `${res?.data?.message}`,
        status: "success",
        position: "top",
        isClosable: true,
      });
      reset();
    }

    console.log(res?.error?.message);

    if (res?.error?.status === 401) {
      toast({
        title: `${res?.error?.message}`,
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };

  const newPassword = watch("password", ""); // Provide a default value for newPassword

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mt="4" isInvalid={!!errors.password}>
        <FormLabel fontSize="sm" fontWeight="normal" textColor="gray.600">
          New Password
        </FormLabel>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          render={({ field }) => (
            <Input size="md" borderRadius="md" width="lg" type="password" {...field} />
          )}
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>

      <FormControl mt="4" isInvalid={!!errors.confirm_password}>
        <FormLabel fontSize="sm" fontWeight="normal" textColor="gray.600">
          Confirm Password
        </FormLabel>
        <Controller
          name="confirm_password"
          control={control}
          defaultValue=""
          rules={{
            required: "This field is required",
            validate: (value) => value === newPassword || "Passwords do not match",
          }}
          render={({ field }) => (
            <Input size="md" borderRadius="md" width="lg" type="password" {...field} />
          )}
        />
        <FormErrorMessage>
          {errors.confirm_password && errors.confirm_password.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        isLoading={isLoading}
        loadingText="saving..."
        colorScheme="red"
        mt="5"
        size="md"
      >
        Save
      </Button>
    </form>
  );
};

export default PasswordForm;
