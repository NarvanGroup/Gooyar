// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Rating, RatingProps, Typography } from "@mui/material";

// ----------------------------------------------------------------------

type Props = RatingProps & {
  name: string;
  label?: string;
};

export default function RHFRating({ name, label, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Rating
            {...field}
            // fullWidth
            // value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            // error={!!error}
            // helperText={error ? error?.message : helperText}
            // {...other}
          />
        )}
      />
    </>
  );
}
