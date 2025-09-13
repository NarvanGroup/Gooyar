"use client";
import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import DozensCarousel from "./DozensCarousel";

const features = [
  {
    title: "حفظ اعتبار و امنیت کسب‌وکارها",
    subtext:
      "ما در کنار شما هستیم تا با اعتبار بیشتر و نگرانی کمتر، معاملات خود را انجام دهید",
  },
  {
    title: "اطمینان برای فروشندگان",
    subtext:
      "شناسبان به فروشندگان کمک می‌کند تا تنها به مشتریانی اعتماد کنند که هویت آن‌ها تأیید شده است",
  },
  {
    title: "کاهش ریسک کلاهبرداری",
    subtext:
      "با سیستم‌های پیشرفته‌ی شناسایی هویت، از تقلب‌ها و کلاهبرداری‌های احتمالی پیشگیری می‌کنیم",
  },
];

const PowerfulDozens = () => {
  return (
    <>
      <Container
        sx={{
          maxWidth: "1400px !important",
          mt: {
            xs: "40px",
            lg: "90px",
          },
        }}
      >
        <Box
          bgcolor="primary.light"
          borderRadius="24px"
          sx={{
            py: {
              xs: "40px",
              lg: "70px",
            },
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} lg={6} sm={9}>
                <Typography
                  variant="h4"
                  mb="55px"
                  fontWeight={700}
                  fontSize="40px"
                  lineHeight="1.3"
                  sx={{
                    fontSize: {
                      lg: "40px",
                      xs: "35px",
                    },
                  }}
                >
                  چرا شناس‌بان؟
                  {/* شناس‌بان مناسب چه کسانیه؟ */}
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <DozensCarousel />
          <Container maxWidth="lg">
            <Grid container spacing={3} mt={5}>
              {features.map((feature, i) => (
                <Grid item xs={12} lg={4} sm={4} textAlign="center" key={i}>
                  <Typography
                    variant="h4"
                    mb="16px"
                    fontWeight={700}
                    sx={{
                      fontSize: {
                        xs: "17px",
                      },
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" lineHeight="28px">
                    {feature.subtext}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default PowerfulDozens;
