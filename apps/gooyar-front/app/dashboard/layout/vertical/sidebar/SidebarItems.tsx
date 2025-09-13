import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import NavGroup from "./NavGroup/NavGroup";
import { defaultCustomizer } from "@/shared/constants/defaultCustomizer";
import { useToggleMobileSidebarStore } from "@/store/useToggleMobileSidebarStore";

const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu: any = lgUp
    ? defaultCustomizer.isCollapse && !defaultCustomizer.isSidebarHover
    : "";
  const {
    toggle: toggleSidebar,
    close,
    toggleMobileSidebar,
    hoverSidebar,
  } = useToggleMobileSidebarStore();
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return (
              <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
            );

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={toggleMobileSidebar}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={toggleMobileSidebar}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
