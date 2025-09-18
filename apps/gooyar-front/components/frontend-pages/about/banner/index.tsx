"use client";
import React from "react";
import { Box, Stack, Typography, Container, Grid, Button } from "@mui/material";
import Link from "next/link";
import useUserStore from "@/store/useUserStore";
import { useAuthStateStore } from "@/store/useAuthStateStore";

const Banner = () => {
  const { user } = useUserStore();
  const { open: openAuthModal } = useAuthStateStore();

  return (
    <Box
      bgcolor="primary.light"
      sx={{
        paddingTop: {
          xs: "40px",
          lg: "100px",
        },
        paddingBottom: {
          xs: "40px",
          lg: "100px",
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid size={{ xs: 12, lg: 6 }} alignItems="center">
            <Typography
              variant="h1"
              mb={3}
              lineHeight={1.4}
              fontWeight={700}
              sx={{
                fontSize: {
                  xs: "24px",
                  sm: "32px",
                },
              }}
            >
              ماموریت ما ایجاد فضایی امن برای فروشندگان و خریداران، جایی که
              اعتماد اولین و مهم‌ترین اصل در انجام معاملاته.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              {user.isLoggedIn ? (
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  href="/dashboard/identification"
                >
                  استعلام
                </Button>
              ) : (
                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  onClick={() => openAuthModal()}
                >
                  استعلام
                </Button>
              )}
              {/* <Button variant="outlined" size="large">
                View Open Positions
              </Button> */}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }} display="flex" alignItems="center">
            <Typography lineHeight={1.9}>
              شناس‌بان به‌عنوان یک پیشگام در ارائه خدمات احراز هویت آنلاین، با
              هدف ایجاد اعتماد و اطمینان در معاملات، به وجود آمده است. ما با
              ارائه خدمات نوین به طلافروشی‌ها و فروشگاه‌های دیگر، به آن‌ها کمک
              می‌کنیم تا خریداران خود را بررسی کرده و از اصالت اطلاعات هویتی
              آن‌ها اطمینان حاصل کنند. ما بر این باوریم که معاملات باید شفاف،
              امن و بدون خطر انجام شوند. شناس‌بان با تکیه بر تکنولوژی‌های
              پیشرفته و تیمی متخصص، تلاش می‌کند تا فرآیندهای احراز هویت را
              ساده‌تر و مؤثرتر کند و از کلاهبرداری و خطرات احتمالی جلوگیری
              نماید.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
