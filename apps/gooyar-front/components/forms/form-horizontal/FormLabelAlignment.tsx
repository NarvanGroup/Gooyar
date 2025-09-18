"use client";
import {
  Grid,
  InputAdornment,
  Button,
  Typography,
  Divider,
  MenuItem,
  IconButton,
} from "@mui/material";
import React from "react";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import CustomTextField from "../theme-elements/CustomTextField";
import CustomOutlinedInput from "../theme-elements/CustomOutlinedInput";
import CustomSelect from "../theme-elements/CustomSelect";
import { Stack } from "@mui/material";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const countries = [
  {
    value: "india",
    label: "India",
  },
  {
    value: "uk",
    label: "United Kingdom",
  },
  {
    value: "srilanka",
    label: "Srilanka",
  },
];

const FormLabelAlignment = () => {
  // country
  const [country, setCountry] = React.useState("");

  const handleChange = (event: any) => {
    setCountry(event.target.value);
  };

  //   password
  //
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <Typography variant="h6" mb={3}>
        Account Details
      </Typography>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Layout */}
      {/* ------------------------------------------------------------------------------------------------ */}
    </div>
  );
};

export default FormLabelAlignment;
