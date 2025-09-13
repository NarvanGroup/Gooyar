import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";

import { IconMenu2, IconMoon, IconSun } from "@tabler/icons-react";
import Notifications from "./Notification";
import Profile from "./Profile";
import Cart from "./Cart";
import Search from "./Search";
import Language from "./Language";
import Navigation from "./Navigation";
import MobileRightSidebar from "./MobileRightSidebar";
import { useToggleMobileSidebarStore } from "@/store/useToggleMobileSidebarStore";
import { defaultCustomizer } from "@/shared/constants/defaultCustomizer";
import { useCustomizingStore } from "@/store/useCustomizerStore";
import Link from "next/link";
import { Typography } from "@mui/material";

const Header = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));
  const { themeMode, setThemeMode } = useCustomizingStore();
  // drawer
  const {
    toggle: toggleSidebar,
    close,
    toggleMobileSidebar,
  } = useToggleMobileSidebarStore();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: defaultCustomizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        {lgDown && (
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={lgUp ? toggleSidebar : toggleMobileSidebar}
          >
            <IconMenu2 size="20" />
          </IconButton>
        )}

        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />
        {lgUp ? (
          <>
            <Link href="/">
              <Typography
                variant="subtitle2"
                fontWeight="600"
                color="textPrimary"
                display="flex"
                alignItems="center"
                gap="4px"
                sx={{
                  ml: 1,
                }}
              >
                خانه
              </Typography>
            </Link>
            {/* <Navigation /> */}
          </>
        ) : null}

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* <Language /> */}
          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Cart /> */}
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}

          {/* <IconButton size="large" color="inherit">
            {defaultCustomizer.activeMode === "light" ? (
              <IconMoon
                size="21"
                stroke="1.5"
                onClick={() => setThemeMode("dark")}
              />
            ) : (
              <IconSun
                size="21"
                stroke="1.5"
                onClick={() => setThemeMode("light")}
              />
            )}
          </IconButton> */}

          <Notifications />
          {/* ------------------------------------------- */}
          {/* Toggle Right Sidebar for mobile */}
          {/* ------------------------------------------- */}
          {/* {lgDown ? <MobileRightSidebar /> : null} */}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
