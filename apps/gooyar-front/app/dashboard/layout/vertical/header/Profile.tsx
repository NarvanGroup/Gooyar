import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import * as dropdownData from "./data";

import { IconCrown, IconMail } from "@tabler/icons-react";
import Image from "next/image";
import useUserStore from "@/store/useUserStore";
import { ProfilePopover } from "../sidebar/SidebarProfile/ProfilePopover";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const { user, logout } = useUserStore();

  return (
    <Box>
      <IconButton
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={"/images/profile/user-1.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <ProfilePopover
        onClose={() => {
          setAnchorEl2(null);
        }}
        anchorEl2={anchorEl2}
      />
    </Box>
  );
};

export default Profile;
