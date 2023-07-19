import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";

const PasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const newPassword = watch("new_password", ""); // Provide a default value for newPassword

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.current_password}>
        <FormLabel fontSize="sm" fontWeight="normal" textColor="gray.600">
          Current Password
        </FormLabel>
        <Controller
          name="current_password"
          control={control}
          defaultValue=""
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Input size="md" borderRadius="md" width="lg" type="password" {...field} />
          )}
        />
        <FormErrorMessage>
          {errors.current_password && errors.current_password.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt="4" isInvalid={!!errors.new_password}>
        <FormLabel fontSize="sm" fontWeight="normal" textColor="gray.600">
          New Password
        </FormLabel>
        <Controller
          name="new_password"
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
        <FormErrorMessage>{errors.new_password && errors.new_password.message}</FormErrorMessage>
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

      <Button type="submit" colorScheme="red" mt="5" size="md">
        Save
      </Button>
    </form>
  );
};

export default PasswordForm;
