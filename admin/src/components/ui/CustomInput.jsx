import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const CustomInput = ({ label, name, type, control, errors, rules }) => {
  return (
    <FormControl isInvalid={!!errors}>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Input type={type} {...field} />
            <FormErrorMessage fontSize={"sm"}>{errors && errors.message}</FormErrorMessage>
          </>
        )}
      />
    </FormControl>
  );
};

export default CustomInput;
