import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const CustomInput = ({ label, name, type, control }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input type={type} {...field} />}
      />
    </FormControl>
  );
};

export default CustomInput;
