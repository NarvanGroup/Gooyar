// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Box, Chip, TextField, TextFieldProps } from "@mui/material";
import { KeyboardEvent, useEffect, useState } from "react";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export default function RHFDynamicChipTextField({
  name,
  helperText,
  ...other
}: Props) {
  const {
    control,
    formState: { defaultValues },
  } = useFormContext();

  const [items, setItems] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    if (defaultValues?.[name]?.length > 0) {
      setItems(defaultValues?.[name]);
    }
  }, [defaultValues]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue.includes(" ")) {
      return;
    }

    setInputText(inputValue);
  };

  const handleInputKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    callback: any
  ) => {
    if (event.key === "Enter" && inputText.trim() !== "") {
      event.preventDefault();
      setItems([...items, inputText.trim()]);
      callback?.([...items, inputText.trim()]);
      setInputText("");
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...rest },
        fieldState: { error },
      }) => (
        <>
          <TextField
            {...rest}
            onKeyDown={(event) => handleInputKeyDown(event, onChange)}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    mt: 3,
                    mb: 0.5,
                    mr: 1,
                  }}
                >
                  {items.map((value, index) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() =>
                        setItems(
                          items.filter((i) => items.indexOf(i) !== index)
                        )
                      }
                    />
                  ))}
                </Box>
              ),
            }}
            value={inputText}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          />
        </>
      )}
    />
  );
}
