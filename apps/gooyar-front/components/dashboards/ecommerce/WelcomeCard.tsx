"use client";
import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
} from "@mui/material";
import { IconArrowUpRight, IconChevronLeft } from "@tabler/icons-react";
import Image from "next/image";
import useUserStore from "@/store/useUserStore";
import Link from "next/link";
import useResponsive from "@/shared/hooks/useResponsive";

const WelcomeCard = () => {
  const { user } = useUserStore();
  const isMdUp = useResponsive("up", "md");

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        py: 0,
        position: "relative",
      }}
    >
      <CardContent sx={{ py: 4, px: 2 }}>
        <Grid container justifyContent="space-between">
          <Grid size={{ sm: 6 }} display="flex" alignItems="center">
            <Box>
              <Box
                gap="16px"
                mb={5}
                sx={{
                  display: {
                    xs: "block",
                    sm: "flex",
                  },
                  alignItems: "center",
                }}
              >
                <Avatar
                  src="/images/profile/user-1.jpg"
                  alt="img"
                  sx={{ width: 40, height: 40 }}
                />
                <Typography variant="h5" whiteSpace="nowrap">
                  خوش اومدی{" "}
                  {user?.first_name && user?.last_name
                    ? `${user?.first_name + " " + user?.last_name}`
                    : "کاربر عزیز"}
                  !
                </Typography>
              </Box>

              <Stack
                spacing={2}
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Image
                    src="/images/svgs/icon-user-male.svg"
                    alt={"topcard.icon"}
                    width="50"
                    height="50"
                  />
                  <Typography
                    color={"primary" + ".main"}
                    mt={1}
                    variant="subtitle1"
                    fontWeight={600}
                  >
                    کاربر احراز هویت شده
                  </Typography>
                  {/* <Link href="/dashboard/account?tab=verification">
                    <Typography
                      color={"primary.main"}
                      variant="caption"
                      fontWeight={600}
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        gap: 0.5,
                      }}
                    >
                      احراز هویت <IconChevronLeft size={15} />
                    </Typography>
                  </Link> */}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  minWidth={100}
                >
                  <Image
                    src="/images/svgs/icon-speech-bubble.svg"
                    alt={"topcard.icon"}
                    width="50"
                    height="50"
                  />
                  <Typography
                    color={"success" + ".main"}
                    mt={1}
                    variant="subtitle1"
                    fontWeight={600}
                  >
                    استعلام
                  </Typography>
                  <Link href="/dashboard/identification">
                    <Typography
                      color={"success.main"}
                      variant="caption"
                      fontWeight={600}
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        gap: 0.5,
                      }}
                    >
                      شروع
                      <IconChevronLeft size={15} />
                    </Typography>
                  </Link>
                </Box>
              </Stack>
            </Box>
          </Grid>
          {isMdUp && (
            <Grid size={{ sm: 6 }}>
              <Box
                sx={{
                  width: "340px",
                  height: "246px",
                  position: "absolute",
                  right: "-70px",
                  // bottom: "-90px",
                  marginTop: "20px",
                }}
              >
                <Image
                  src={"/images/backgrounds/track-bg.png"}
                  alt="img"
                  height={195}
                  width={168}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
