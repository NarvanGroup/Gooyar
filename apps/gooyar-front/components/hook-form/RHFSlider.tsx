// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
  Slider,
  SliderProps,
  FormHelperText,
  Box,
  Typography,
  TextField,
} from "@mui/material";

// ----------------------------------------------------------------------

type Props = SliderProps & {
  name: string;
  helperText?: React.ReactNode;
  minLabel?: string;
  maxLabel?: string;
};

export default function RHFSlider({
  name,
  helperText,
  minLabel,
  maxLabel,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <Slider {...field} valueLabelDisplay="auto" {...other} />

            {(!!error || helperText) && (
              <FormHelperText error={!!error}>
                {error ? error?.message : helperText}
              </FormHelperText>
            )}
          </div>
        )}
      />
      {minLabel && maxLabel && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body2"
            // onClick={() => setVal(MIN)}
            sx={{ cursor: "pointer" }}
          >
            {minLabel}
          </Typography>
          <Typography
            variant="body2"
            // onClick={() => setVal(MAX)}
            sx={{ cursor: "pointer" }}
          >
            {maxLabel}
          </Typography>
        </Box>
      )}
    </>
  );
}
