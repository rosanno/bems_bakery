import { FormControl, FormLabel } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const MultiSelect = ({ label, control, options }) => {
  return (
    <FormControl>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Controller
        name="ingredients"
        control={control}
        render={({ field }) => (
          <CreatableSelect
            {...field}
            isMulti
            options={options}
            styles={{
              control: (baseStyle) => ({
                ...baseStyle,
                borderColor: "#E2E8F0",
              }),
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default MultiSelect;
