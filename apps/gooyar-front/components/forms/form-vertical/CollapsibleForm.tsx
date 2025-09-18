"use client";
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  FormControlLabel,
  RadioGroup,
  FormControl,
  InputAdornment,
  Stack,
  Button,
  MenuItem,
} from "@mui/material";
import { IconChevronDown, IconHelp } from "@tabler/icons-react";

// components
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import CustomTextField from "../theme-elements/CustomTextField";
import CustomRadio from "../theme-elements/CustomRadio";
import CustomOutlinedInput from "../theme-elements/CustomOutlinedInput";
import { Box } from "@mui/material";
import CustomSelect from "../theme-elements/CustomSelect";

const states = [
  {
    value: "1",
    label: "Alaska",
  },
  {
    value: "2",
    label: "Arizona",
  },
  {
    value: "3",
    label: "Hawaii",
  },
];

const CollapsibleForm = () => {
  // address type
  const [value, setValue] = React.useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  //   delivery options
  const [value2, setValue2] = React.useState("");

  const handleChange2 = (event: any) => {
    setValue2(event.target.value);
  };

  //   payment
  const [value3, setValue3] = React.useState("radio1");

  const handleChange3 = (event: any) => {
    setValue3(event.target.value);
  };

  // states
  const [state, setStates] = React.useState("");

  const handleChange4 = (event: any) => {
    setStates(event.target.value);
  };

  // default open slide
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange5 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Layout */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Accordion
        elevation={9}
        sx={{ mb: 2 }}
        expanded={expanded === "panel1"}
        onChange={handleChange5("panel1")}
      >
        <AccordionSummary
          expandIcon={<IconChevronDown size="20" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Delivery Address</Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <Accordion
        elevation={9}
        sx={{ mb: 2 }}
        expanded={expanded === "panel2"}
        onChange={handleChange5("panel2")}
      >
        <AccordionSummary
          expandIcon={<IconChevronDown size="20" />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">Delivery Options</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup
            row
            name="delivery-opt"
            value={value2}
            onChange={handleChange2}
          >
            <FormControlLabel
              value="radio1"
              control={<CustomRadio />}
              label="Standard 3-5 Days"
            />
            <FormControlLabel
              value="radio2"
              control={<CustomRadio />}
              label="Express"
            />
            <FormControlLabel
              value="radio3"
              control={<CustomRadio />}
              label="Overnight"
            />
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion
        elevation={9}
        sx={{ mb: 2 }}
        expanded={expanded === "panel3"}
        onChange={handleChange5("panel3")}
      >
        <AccordionSummary
          expandIcon={<IconChevronDown size="20" />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography variant="h6">Payment Method</Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CollapsibleForm;
