import { create } from "zustand";

interface CustomizingState {
  themeMode: "dark" | "light";
  setThemeMode: (mode: "dark" | "light") => void;
  customizer: any;
  setCustomizer: (customizer: any) => void;
}

export const defaultCustomizer: any = {
  activeDir: "ltr",
  activeMode: "light", // This can be light or dark
  activeTheme: "BLUE_THEME", // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
  SidebarWidth: 270,
  MiniSidebarWidth: 87,
  TopbarHeight: 70,
  isLayout: "boxed", // This can be full or boxed
  isCollapse: false, // to make sidebar Mini by default
  isSidebarHover: false,
  isMobileSidebar: false,
  isHorizontal: false,
  isLanguage: "en",
  isCardShadow: true,
  borderRadius: 7,
};

export const useCustomizingStore = create<CustomizingState>((set) => ({
  themeMode: "light",
  setThemeMode: (mode) => set({ themeMode: mode }),
  customizer: defaultCustomizer,
  setCustomizer: (customizer) => set({ customizer }),
}));
