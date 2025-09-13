import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import * as dropdownData from "./data";

import { IconBellRinging } from "@tabler/icons-react";
import Link from "next/link";
import Scrollbar from "@/components/custom-scroll/Scrollbar";
import {
  getUnreadNotificationsService,
  markAllAsReadService,
} from "@/api/services/userServices";
import useUserStore from "@/store/useUserStore";
import { fPersianDate } from "@/shared/helpers/formatTime";
import { useRouter } from "next/navigation";

const Notifications = () => {
  const router = useRouter();

  const { user } = useUserStore();
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [notifications, setNotifications] = useState([]);

  const getUnreadNotifications = async () => {
    try {
      const result = await getUnreadNotificationsService();
      if (result.success) {
        setNotifications(result.data);
      }
    } catch (error) {}
  };

  const handleMarkAllAsRead = async () => {
    try {
      const result = await markAllAsReadService();
      if (result.success) {
        getUnreadNotifications();
      }
    } catch (error) {}
  };

  useEffect(() => {
    user?.isLoggedIn && getUnreadNotifications();
  }, [user?.isLoggedIn]);

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          color: anchorEl2 ? "primary.main" : "text.secondary",
        }}
        onClick={handleClick2}
      >
        <Badge
          variant={notifications?.length > 0 ? "dot" : "standard"}
          color="primary"
        >
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
          },
        }}
      >
        <Stack
          direction="row"
          py={2}
          px={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">پیام ها</Typography>
          <Chip
            label={`${notifications?.length} جدید`}
            color="primary"
            size="small"
          />
        </Stack>
        <Scrollbar sx={{ height: "385px" }}>
          {notifications?.length === 0 ? (
            <Typography p={3}>پیام تازه ای نیست!</Typography>
          ) : (
            notifications.map((notification: any, index) => (
              <Box
                onClick={() => {
                  handleClose2();
                  router.push("/dashboard/account?tab=notifications");
                }}
                key={index}
              >
                <MenuItem sx={{ py: 2, px: 4 }}>
                  <Stack direction="row" spacing={2}>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="textPrimary"
                        fontWeight={600}
                        noWrap
                        sx={{
                          width: "240px",
                        }}
                      >
                        {notification.data?.message}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        sx={{
                          width: "240px",
                        }}
                        noWrap
                      >
                        {fPersianDate(notification.data?.created_at)}
                      </Typography>
                    </Box>
                  </Stack>
                </MenuItem>
              </Box>
            ))
          )}
        </Scrollbar>
        <Box p={3} pb={1}>
          <Button
            href="/dashboard/account?tab=notifications"
            variant="outlined"
            component={Link}
            color="primary"
            fullWidth
          >
            مشاهده همه
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Notifications;
