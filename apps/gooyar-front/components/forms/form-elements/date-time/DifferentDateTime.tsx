"use client";
import React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ChildCard from "@/components/shared/ChildCard";
import DifferentDesignCode from "./code/DifferentDesignCode";

const DifferentDateTime = () => {
  const [value, setValue] = React.useState<any | null>(null);

  return (
    <ChildCard title="Different Design" codeModel={<DifferentDesignCode />}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          // renderInput={(props) => (
          //   <CustomTextField
          //     {...props}
          //     fullWidth
          //     size="small"
          //     sx={{
          //       "& .MuiSvgIcon-root": {
          //         width: "18px",
          //         height: "18px",
          //       },
          //       "& .MuiFormHelperText-root": {
          //         display: "none",
          //       },
          //     }}
          //   />
          // )}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
      </LocalizationProvider>
    </ChildCard>
  );
};

export default DifferentDateTime;
