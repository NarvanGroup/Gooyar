import CustomSelect from "@/components/forms/theme-elements/CustomSelect";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";
import { MenuItem, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";

interface DebouncedInputProps
  extends Omit<TextFieldProps, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
}

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== initialValue) {
        onChange(value);
      }
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange, initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <CustomTextField {...props} value={value} onChange={handleChange} />;
};
