"use client";
import Image from "next/image";
import { Box, CardContent, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

const topcards = [
  {
    icon: "/images/svgs/icon-user-male.svg",
    title: "تایید شده سطح 2",
    // digits: "96",
    action: "احراز هویت",
    actionLink: "/dashboard/account?tab=verification",
    bgcolor: "primary",
  },
  {
    icon: "/images/svgs/icon-favorites.svg",
    title: "اشتراک طلایی",
    bgcolor: "error",
    action: "تمدید",
    actionLink: "/dashboard/account?tab=plan",
  },
  // {
  //   icon: "/images/svgs/icon-connect.svg",
  //   title: "استعلام ها",
  //   digits: "59",
  //   bgcolor: "info",
  // },
  // {
  //   icon: "/images/svgs/icon-briefcase.svg",
  //   title: "Clients",
  //   digits: "3,650",
  //   bgcolor: "warning",
  // },
  // {
  //   icon: "/images/svgs/icon-mailbox.svg",
  //   title: "Projects",
  //   digits: "356",
  //   bgcolor: "secondary",
  // },

  {
    icon: "/images/svgs/icon-speech-bubble.svg",
    title: "استعلام",
    // digits: "$96k",
    action: "شروع",
    actionLink: "/dashboard/identification",
    bgcolor: "success",
  },
];

const TopCards = () => {
  return (
    <Box display="flex" gap={3} mt={2} width="100%">
      {topcards.map((topcard, i) => (
        // <Grid size={{ xs: 12, sm: 4, lg: 2 }} key={i}>
        <Box bgcolor={topcard.bgcolor + ".light"} textAlign="center">
          <CardContent
            sx={{
              padding: { xs: 1, md: 3 },
              minWidth: "150px",
            }}
          >
            <Image
              src={topcard.icon}
              alt={"topcard.icon"}
              width="50"
              height="50"
            />
            <Typography
              color={topcard.bgcolor + ".main"}
              mt={1}
              variant="subtitle1"
              fontWeight={600}
            >
              {topcard.title}
            </Typography>
            <Typography
              color={topcard.bgcolor + ".main"}
              variant="h4"
              fontWeight={600}
            >
              {/* {topcard.digits} */}
            </Typography>
            {topcard.actionLink && (
              <Link href={topcard.actionLink}>
                <Typography
                  color={topcard.bgcolor + ".main"}
                  variant="caption"
                  fontWeight={600}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    gap: 0.5,
                  }}
                >
                  {topcard.action} <IconChevronLeft size={15} />
                </Typography>
              </Link>
            )}
          </CardContent>
        </Box>
        // </Grid>
      ))}
    </Box>
  );
};

export default TopCards;
