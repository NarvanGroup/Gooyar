"use client";
import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const ShapeBg = styled(Box)(() => ({
  position: "absolute",
  right: 0,
  top: 0,
}));

const Address = () => {
  return (
    <Box bgcolor="primary.main" borderRadius="12px" position="relative">
      <Box p="30px" zIndex={1}>
        <Typography fontSize="20px" fontWeight={700} color="white" mb={2}>
          همین امروز با ما تماس بگیرید
        </Typography>
        <Typography variant="body1" color="white" lineHeight={1.6}>
          برای دریافت مشاوره رایگان و انتخاب بهنرین تعرفه با ما در ارتباط باشید.
        </Typography>

        {/* <Divider sx={{ opacity: 0.3, my: "40px" }} />

        <Typography fontSize="20px" fontWeight={700} color="white" mb={2}>
          Our Location
        </Typography>
        <Typography variant="body1" color="white" lineHeight={1.6}>
          Visit us in person or find our contact details to connect with us
          directly.
        </Typography> */}
      </Box>
    </Box>
  );
};

export default Address;
