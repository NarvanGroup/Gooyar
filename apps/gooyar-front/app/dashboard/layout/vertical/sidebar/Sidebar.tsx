import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SidebarItems from "./SidebarItems";
import Logo from "../../shared/logo/Logo";

import { Profile } from "./SidebarProfile/Profile";
import { defaultCustomizer } from "@/shared/constants/defaultCustomizer";
import { useToggleMobileSidebarStore } from "@/store/useToggleMobileSidebarStore";
import Scrollbar from "@/components/custom-scroll/Scrollbar";

const Sidebar = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));

  const theme = useTheme();
  const toggleWidth =
    defaultCustomizer.isCollapse && !defaultCustomizer.isSidebarHover
      ? defaultCustomizer.MiniSidebarWidth
      : defaultCustomizer.SidebarWidth;

  const {
    toggle: toggleSidebar,
    close,
    toggleMobileSidebar,
    hoverSidebar,
    isOpen: isSidebarOpen,
  } = useToggleMobileSidebarStore();

  const onHoverEnter = () => {
    if (defaultCustomizer.isCollapse) {
      hoverSidebar(true);
    }
  };

  const onHoverLeave = () => {
    hoverSidebar(false);
  };

  return (
    <>
      {!lgUp ? (
        <Box
          sx={{
            zIndex: 100,
            width: toggleWidth,
            flexShrink: 0,
            ...(defaultCustomizer.isCollapse && {
              position: "absolute",
            }),
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar for desktop */}
          {/* ------------------------------------------- */}
          <Drawer
            anchor="left"
            open
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
            variant="permanent"
            PaperProps={{
              sx: {
                transition: theme.transitions.create("width", {
                  duration: theme.transitions.duration.shortest,
                }),
                width: toggleWidth,
                boxSizing: "border-box",
                overflowX: "hidden",
              },
            }}
          >
            {/* ------------------------------------------- */}
            {/* Sidebar Box */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                height: "100%",
              }}
            >
              {/* ------------------------------------------- */}
              {/* Logo */}
              {/* ------------------------------------------- */}
              <Box pt={2} px={3}>
                <Logo />
              </Box>
              <Scrollbar sx={{ height: "calc(100% - 190px)" }}>
                {/* ------------------------------------------- */}
                {/* Sidebar Items */}
                {/* ------------------------------------------- */}
                <SidebarItems />
              </Scrollbar>
              <Profile />
            </Box>
          </Drawer>
        </Box>
      ) : (
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          onClose={() => toggleMobileSidebar()}
          variant="temporary"
          PaperProps={{
            sx: {
              width: defaultCustomizer.SidebarWidth,
              border: "0 !important",
              boxShadow: (theme) => theme.shadows[8],
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Logo */}
          {/* ------------------------------------------- */}
          <Box pt={2} px={2}>
            <Logo />
          </Box>
          {/* ------------------------------------------- */}
          {/* Sidebar For Mobile */}
          {/* ------------------------------------------- */}
          <SidebarItems />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
