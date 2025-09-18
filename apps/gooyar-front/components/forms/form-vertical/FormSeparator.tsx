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

const lang = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "fr",
    label: "French",
  },
];

const FormSeparator = () => {
  // country
  const [country, setCountry] = React.useState("");

  const handleChange = (event: any) => {
    setCountry(event.target.value);
  };

  // language
  const [language, setLanguage] = React.useState("");

  const handleChange2 = (event: any) => {
    setLanguage(event.target.value);
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

  //  confirm  password
  //
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (
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

export default FormSeparator;
