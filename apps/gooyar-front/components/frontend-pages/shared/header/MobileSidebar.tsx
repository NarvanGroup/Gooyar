"use client";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// import Logo from "@/app/dashboard/layout/shared/logo/Logo";
import { NavLinks } from "./Navigations";
import { Chip } from "@mui/material";
import Logo from "@/app/dashboard/layout/shared/logo/Logo";
import useUserStore from "@/store/useUserStore";
import { useAuthStateStore } from "@/store/useAuthStateStore";
import { IconUser } from "@tabler/icons-react";

const MobileSidebar = ({ onCloseDrawer }: any) => {
  const { user } = useUserStore();
  const { open: openAuthModal } = useAuthStateStore();

  return (
    <>
      <Box px={3}>
        <Logo />{" "}
      </Box>
      <Box p={3}>
        <Stack direction="column" spacing={2}>
          {NavLinks.map(
            (navlink: any, i) =>
              ((navlink.isAuthNeeded && user.isLoggedIn) ||
                !navlink.isAuthNeeded) && (
                <Button
                  color="inherit"
                  href={navlink.href}
                  key={i}
                  sx={{
                    justifyContent: "start",
                  }}
                >
                  {navlink.title}{" "}
                  {navlink.new ? (
                    <Chip
                      label="New"
                      size="small"
                      sx={{
                        ml: "6px",
                        borderRadius: "8px",
                        color: "primary.main",
                        backgroundColor: "rgba(93, 135, 255, 0.15)",
                      }}
                    />
                  ) : null}
                </Button>
              )
          )}

          {user?.isLoggedIn ? (
            <Button
              color="primary"
              variant="outlined"
              href="/dashboard/account?tab=setting"
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
              onClick={() => {
                onCloseDrawer();
                openAuthModal();
              }}
            >
              ورود / ثبت‌نام
            </Button>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MobileSidebar;
