import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const SingleSelect = ({ label, name, placeholder, control, data }) => {
  return (
    <FormControl>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select {...field} placeholder={placeholder} fontSize="sm">
            {data?.categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SingleSelect;
