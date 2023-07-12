import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const CustomTextArea = ({ label, control }) => {
  return (
    <FormControl>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Controller
        name="description"
        control={control}
        render={({ field }) => <Textarea {...field} placeholder="Product decription..." rows="5" fontSize="sm" />}
      />
    </FormControl>
  );
};

export default CustomTextArea;
