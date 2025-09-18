"use client";
import React from "react";
import {
  Box,
  FormControlLabel,
  Button,
  Grid,
  MenuItem,
  FormControl,
  Alert,
} from "@mui/material";
import CustomTextField from "../theme-elements/CustomTextField";
import CustomSelect from "../theme-elements/CustomSelect";
import CustomRadio from "../theme-elements/CustomRadio";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import ParentCard from "../../shared/ParentCard";
import BasicHeaderFormCode from "./code/BasicHeaderFormCode";

const currencies = [
  {
    value: "female",
    label: "Female",
  },
  {
    value: "male",
    label: "Male",
  },
  {
    value: "other",
    label: "Other",
  },
];

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

const FbBasicHeaderForm = () => {
  const [currency, setCurrency] = React.useState("");

  const handleChange2 = (event: any) => {
    setCurrency(event.target.value);
  };

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange3 = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const [country, setCountry] = React.useState("");

  const handleChange4 = (event: any) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <ParentCard
        title="Basic Header Form"
        codeModel={<BasicHeaderFormCode />}
        footer={
          <>
            <Button
              variant="contained"
              color="error"
              sx={{
                mr: 1,
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </>
        }
      >
        <>
          <Alert severity="info">Person Info</Alert>
          <form></form>
          <Alert severity="info">Address</Alert>
        </>
      </ParentCard>
    </div>
  );
};

export default FbBasicHeaderForm;
