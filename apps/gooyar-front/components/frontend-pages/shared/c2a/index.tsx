"use client";
import React from "react";
import { Box, Grid, Typography, Container, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuthStateStore } from "@/store/useAuthStateStore";
import useUserStore from "@/store/useUserStore";

const C2a = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const smUp = useMediaQuery((theme: any) => theme.breakpoints.only("sm"));

  const { user } = useUserStore();
  const { open: openAuthModal } = useAuthStateStore();

  return (
    <>
      <Container
        sx={{
          maxWidth: "1400px !important",
          py: {
            xs: "20px",
            lg: "30px",
          },
        }}
      >
        <Box
          bgcolor="primary.light"
          borderRadius="24px"
          overflow="hidden"
          position="relative"
          sx={{
            py: {
              xs: "40px",
              lg: "70px",
            },
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} lg={6} sm={8}>
                <Typography
                  variant="h4"
                  mb={3}
                  fontWeight={700}
                  fontSize="40px"
                  lineHeight="1.4"
                  sx={{
                    fontSize: {
                      lg: "40px",
                      xs: "30px",
                    },
                  }}
                >
                  فروشگاه خود را ایمن کنید
                </Typography>
                <Stack
                  spacing={{ xs: 1, sm: 2 }}
                  direction="row"
                  flexWrap="wrap"
                  mb={3}
                >
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
                </Stack>
                <Typography fontSize="14px">
                  با تأیید هویت خریداران خود، به اطمینان و امنیت فروشگاه خود
                  بیافزایید
                </Typography>
              </Grid>
            </Grid>
          </Container>

          {lgUp ? (
            <Image
              src="/images/security1.png"
              alt="design"
              width={900}
              height={365}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "auto",
                height: "100%",
                // transform: "rotate(180deg)",
              }}
            />
          ) : null}

          {smUp ? (
            <Image
              src="/images/security1.png"
              alt="design"
              width={900}
              height={365}
              style={{
                position: "absolute",
                left: "-200px",
                top: 0,
                width: "auto",
                height: "100%",
                transform: "rotate(180deg)",
              }}
            />
          ) : null}
        </Box>
      </Container>
    </>
  );
};

export default C2a;
