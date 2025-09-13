"use client";

import React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import ChildCard from "@/components/shared/ChildCard";
import BasicDateTimeCode from "./code/BasicDateTimeCode";
import CustomTextField from "../../theme-elements/CustomTextField";

// codeModel

const BasicDateTime = () => {
  // date time
  const [value3, setValue3] = React.useState<any | null>();
  // dayjs("2018-01-01T00:00:00.000Z")

  return (
    <ChildCard title="Basic" codeModel={<BasicDateTimeCode />}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDateTimePicker
          onChange={(newValue) => {
            setValue3(newValue);
          }}
          // renderInput={(inputProps) => (
          //   <CustomTextField
          //     fullWidth
          //     variant="outlined"
          //     size="small"
          //     inputProps={{ "aria-label": "basic date picker" }}
          //     {...inputProps}
          //   />
          // )}
          value={value3}
        />
      </LocalizationProvider>
    </ChildCard>
  );
};

export default BasicDateTime;
