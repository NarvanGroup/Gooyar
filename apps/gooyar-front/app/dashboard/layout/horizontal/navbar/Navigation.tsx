import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavListing from "./NavListing/NavListing";
import Logo from "../../shared/logo/Logo";
//  import { toggleMobileSidebar } from '@/store/customizer/CustomizerSlice';
import SidebarItems from "../../vertical/sidebar/SidebarItems";
import { defaultCustomizer } from "@/shared/constants/defaultCustomizer";
import { useToggleMobileSidebarStore } from "@/store/useToggleMobileSidebarStore";

const Navigation = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const { toggle, close } = useToggleMobileSidebarStore();
  if (lgUp) {
    return (
      <Box sx={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }} py={2}>
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            maxWidth:
              defaultCustomizer.isLayout === "boxed" ? "lg" : "100%!important",
          }}
        >
          <NavListing />
        </Container>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={defaultCustomizer.isMobileSidebar}
      onClose={close}
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
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>
  );
};

export default Navigation;
