"use client";
import React from "react";
import {
  Box,
  Stack,
  Typography,
  Grid,
  Container,
  Divider,
} from "@mui/material";
import Image from "next/image";
import FeatureTitle from "./FeatureTitle";

const Features = () => {
  return (
    <Box pt={10} pb={10}>
      <Container maxWidth="lg">
        {/* <FeatureTitle /> */}

        <Grid container spacing={3} mt={3}>
          <Grid item xs sm={6} lg>
            <Box mb={3} bgcolor="warning.light" borderRadius="24px">
              <Box px={4} py="65px">
                <Stack direction="column" spacing={2} textAlign="center">
                  <Box textAlign="center">
                    <Image
                      src="/images/legislation-min.png"
                      alt="icon1"
                      width={40}
                      height={40}
                    />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    سازگاری با قوانین و مقررات
                  </Typography>
                  <Typography variant="body1">
                    {" "}
                    رعایت کامل قوانین حفاظت از داده‌ها و حفظ حریم خصوصی مشتریان{" "}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Box
              textAlign="center"
              mb={3}
              bgcolor="secondary.light"
              borderRadius="24px"
            >
              <Box px={4} py="50px">
                <Stack direction="column" spacing={2} textAlign="center">
                  <Typography variant="h6" fontWeight={700}>
                    کاهش ریسک و خطرات مالی
                  </Typography>
                  <Typography variant="body1">
                    {" "}
                    کمک به فروشندگان برای جلوگیری از کلاهبرداری و محافظت از
                    سرمایه‌های خود
                  </Typography>
                </Stack>
              </Box>
              <Box height="70px">
                <Image
                  src="/images/safebox-min.png"
                  alt="icon1"
                  width={70}
                  height={70}
                />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={5}
            sx={{
              order: {
                xs: 3,
                lg: 2,
              },
            }}
          >
            <Box
              textAlign="center"
              mb={3}
              bgcolor="primary.light"
              borderRadius="24px"
            >
              <Box pt="65px" pb="40px" px={5}>
                <Image
                  src="/images/id-card-min.png"
                  alt="logo"
                  height="50"
                  width="50"
                />
                <Typography
                  variant="h2"
                  fontWeight="700"
                  mt={4}
                  sx={{
                    fontSize: {
                      lg: "40px",
                      xs: "35px",
                    },
                  }}
                >
                  تأیید هویت پیشرفته{" "}
                </Typography>
                <Typography variant="body1" mt={2}>
                  استفاده از سیستم‌های امنیتی پیشرفته و مطمئن برای تأیید هویت
                  خریداران و اطمینان از اصالت مشتریان.
                </Typography>
                <Box mt={5} mb={2}>
                  <Image
                    src="/images/svgs/undraw_fingerprint.svg"
                    alt="icon1"
                    width={405}
                    height={245}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs
            sm={6}
            lg
            sx={{
              order: {
                xs: 2,
                lg: 3,
              },
            }}
          >
            <Box
              textAlign="center"
              mb={3}
              bgcolor="success.light"
              borderRadius="24px"
            >
              <Box px={4} py="65px">
                <Stack direction="column" spacing={2} textAlign="center">
                  <Box textAlign="center">
                    <Image
                      src="/images/global-service-min.png"
                      alt="icon1"
                      width={40}
                      height={40}
                    />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    خدمات سریع و آسان
                  </Typography>
                  <Typography variant="body1">
                    {" "}
                    دسترسی سریع به تأیید هویت با چند کلیک ساده، مناسب برای
                    کسب‌وکارهای شلوغ و پررفت‌وآمد
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Box
              textAlign="center"
              mb={3}
              bgcolor="error.light"
              borderRadius="24px"
            >
              <Box px={4} py="65px">
                <Stack direction="column" spacing={2} textAlign="center">
                  <Box textAlign="center">
                    <Image
                      src="/images/24-7-min.png"
                      alt="icon1"
                      width={40}
                      height={40}
                    />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    پشتیبانی ۲۴ ساعته و مشاوره تخصصی
                  </Typography>
                  <Typography variant="body1">
                    {" "}
                    تیم پشتیبانی شناس‌بان به صورت شبانه‌روزی آماده پاسخگویی به
                    سوالات و ارائه مشاوره تخصصی به کاربران است
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
