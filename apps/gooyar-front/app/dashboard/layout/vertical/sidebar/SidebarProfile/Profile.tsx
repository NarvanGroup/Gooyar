import { defaultCustomizer } from "@/shared/constants/defaultCustomizer";
import useUserStore from "@/store/useUserStore";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { IconPower } from "@tabler/icons-react";
import Link from "next/link";

export const Profile = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? defaultCustomizer.isCollapse && !defaultCustomizer.isSidebarHover
    : "";

  const { user, logout } = useUserStore();

  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt="Remy Sharp"
            src={"/images/profile/user-1.jpg"}
            sx={{ height: 40, width: 40 }}
          />

          <Box>
            <Typography variant="h6">
              {" "}
              {user?.first_name && user?.last_name
                ? `${user?.first_name + " " + user?.last_name}`
                : "کاربر عزیز"}
            </Typography>
            <Typography variant="caption">مشترک طلایی</Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="خروج" placement="top">
              <IconButton
                color="primary"
                aria-label="logout"
                size="small"
                onClick={logout}
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
