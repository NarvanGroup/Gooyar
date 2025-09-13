"use client";
import React from "react";
import { Typography } from "@mui/material";
import Image from "next/image";

const ContentArea = () => {
  return (
    <>
      <Typography
        variant="h4"
        lineHeight={1.4}
        mb={3}
        fontWeight={700}
        sx={{
          fontSize: {
            lg: "40px",
            xs: "35px",
          },
          mr: {
            xs: 0,
            lg: 4,
          },
        }}
      >
        مشتریان ما راجع به خدمات ما چه میگویند؟
        {/* What our clients think <Image src='/images/logos/logoIcon.svg' alt="logo" width={40} height={40} style={{ margin: '0 8px', verticalAlign: 'middle' }} /> about us? */}
      </Typography>
      <Typography variant="body1" lineHeight={1.8}>
        نظرات مشتریان ما گواهی بر تعهد ما برای ارایه خدمات با کیفیت و شفافه
      </Typography>
    </>
  );
};

export default ContentArea;
