"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
// import Logo from "@/app/dashboard/layout/shared/logo/Logo";
import Navigations from "./Navigations";
import MobileSidebar from "./MobileSidebar";
import { IconCrown, IconMail, IconMenu2, IconUser } from "@tabler/icons-react";
import { useAuthStateStore } from "@/store/useAuthStateStore";
import useUserStore from "@/store/useUserStore";
import { Avatar, Box, Divider, Menu, Typography } from "@mui/material";
import Link from "next/link";
import Logo from "@/app/dashboard/layout/shared/logo/Logo";
import { ProfilePopover } from "@/app/dashboard/layout/vertical/sidebar/SidebarProfile/ProfilePopover";

const HpHeader = (props: any) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
      minHeight: "100px",
    },
    backgroundColor: theme.palette.primary.light,
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
    color: theme.palette.text.secondary,
    justifyContent: "space-between",
  }));

  const { user } = useUserStore();

  //   sidebar
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));

  const [open, setOpen] = React.useState(false);
  const { open: openAuthModal } = useAuthStateStore();

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawer = (newOpen: any) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBarStyled position="sticky" elevation={0}>
      <Container
        sx={{
          maxWidth: "1400px !important",
        }}
      >
        <ToolbarStyled>
          <Box mt={2}>
            <Logo />
          </Box>
          {lgDown ? (
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <IconMenu2 size="20" />
            </IconButton>
          ) : null}
          {lgUp ? (
            <>
              <Stack spacing={1} direction="row" alignItems="center">
                <Navigations />
              </Stack>
              {user?.isLoggedIn ? (
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleClick2}
                  startIcon={<IconUser />}
                >
                  {user?.first_name && user?.last_name
                    ? `${user?.first_name + " " + user?.last_name}`
                    : "کاربر عزیز"}
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={openAuthModal}
                >
                  ورود / ثبت‌نام
                </Button>
              )}
            </>
          ) : null}
          <ProfilePopover
            onClose={() => {
              setAnchorEl2(null);
            }}
            anchorEl2={anchorEl2}
          />
        </ToolbarStyled>
      </Container>
      <Drawer
        anchor="left"
        open={open}
        variant="temporary"
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 270,
            border: "0 !important",
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        <MobileSidebar onCloseDrawer={toggleDrawer(false)} />
      </Drawer>
    </AppBarStyled>
  );
};

export default HpHeader;
