"use client";
import React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Tab,
} from "@mui/material";

// components
import BlankCard from "../../shared/BlankCard";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import CustomSelect from "../theme-elements/CustomSelect";
import CustomTextField from "../theme-elements/CustomTextField";
import CustomOutlinedInput from "../theme-elements/CustomOutlinedInput";
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

const FormTabs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  //   country
  const [country, setCountry] = React.useState("");

  const handleChange2 = (event: any) => {
    setCountry(event.target.value);
  };

  //   language
  const [language, setLanguage] = React.useState("en");

  const handleChange3 = (event: any) => {
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

  //   confirm password
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
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Layout */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <BlankCard>hi</BlankCard>
    </div>
  );
};

export default FormTabs;
