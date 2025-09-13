"use client";
import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { IconCrown } from "@tabler/icons-react";
import useUserStore from "@/store/useUserStore";
import { Avatar, Box, Divider, Menu, Typography } from "@mui/material";
import Link from "next/link";

export const ProfilePopover = ({ onClose, anchorEl2 }: any) => {
  const { user, logout } = useUserStore();

  return (
    <Menu
      id="msgs-menu"
      anchorEl={anchorEl2}
      keepMounted
      open={Boolean(anchorEl2)}
      onClose={onClose}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      sx={{
        "& .MuiMenu-paper": {
          width: "360px",
          p: 2,
        },
      }}
    >
      {/* <Typography variant="h5">User Profile</Typography> */}
      <Stack direction="row" pb={3} spacing={2} alignItems="center">
        <Avatar
          src={"/images/profile/user-1.jpg"}
          alt={"ProfileImg"}
          sx={{ width: 95, height: 95 }}
        />
        <Box>
          <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
            {user?.first_name && user?.last_name
              ? `${user?.first_name + " " + user?.last_name}`
              : "کاربر عزیز"}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {user.mobile}
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <IconCrown width={15} height={15} />
            مشترک طلایی{" "}
          </Typography>
          <Button
            variant="contained"
            color="success"
            component={Link}
            href="/dashboard"
            size="small"
            sx={{
              mt: 1,
            }}
          >
            تمدید اشتراک
          </Button>
        </Box>
      </Stack>
      <Divider />

      <Box mt={2} display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/dashboard/account"
        >
          پروفایل کاربری
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          href="/dashboard"
        >
          داشبورد
        </Button>
        <Button variant="outlined" color="primary" onClick={logout}>
          خروج
        </Button>
      </Box>
    </Menu>
  );
};
