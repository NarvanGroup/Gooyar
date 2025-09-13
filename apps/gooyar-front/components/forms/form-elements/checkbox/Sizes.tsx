"use client";
import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { IconCheck, IconCheckbox, IconHeart } from "@tabler/icons-react";

const SizesCheckbox = () => (
  <FormGroup
    row
    sx={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          icon={<IconCheck />}
          checkedIcon={<IconCheckbox />}
          name="checkednormal"
        />
      }
      label="Normal Size"
    />
    <FormControlLabel
      control={
        <Checkbox
          color="secondary"
          icon={<IconCheck fontSize="small" />}
          checkedIcon={<IconCheckbox fontSize="small" />}
          name="checkedsmall"
        />
      }
      label="Small size"
    />
    <FormControlLabel
      control={
        <Checkbox
          color="error"
          icon={<IconCheck />}
          checkedIcon={<IconHeart />}
          name="checkedH"
        />
      }
      label="Heart"
    />
  </FormGroup>
);

export default SizesCheckbox;
