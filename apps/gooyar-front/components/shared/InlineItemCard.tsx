"use client";
import { Box } from "@mui/material";

type Props = {
  children: any;
};

const InlineItemCard = ({ children }: Props) => (
  <Box
    sx={{
      display: {
        xs: "flex",
        sm: "inline-block",
      },
      flexDirection: {
        xs: "column",
        sm: "unset",
      },
      ".MuiChip-root, .MuiButton-root": {
        m: "5px",
      },
    }}
  >
    {children}
  </Box>
);

export default InlineItemCard;
