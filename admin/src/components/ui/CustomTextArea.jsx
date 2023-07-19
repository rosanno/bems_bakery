import { FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const CustomTextArea = ({ label, name, control, errors, rules }) => {
  return (
    <FormControl isInvalid={!!errors}>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Textarea {...field} placeholder="Product decription..." rows="5" fontSize="sm" />
            <FormErrorMessage fontSize={"sm"}>{errors && errors.message}</FormErrorMessage>
          </>
        )}
      />
    </FormControl>
  );
};

export default CustomTextArea;
