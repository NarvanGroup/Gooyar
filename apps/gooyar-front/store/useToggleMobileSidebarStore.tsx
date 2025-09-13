import { create } from "zustand";

interface ToggleMobileSidebarState {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  toggleMobileSidebar: () => void;
  hoverSidebar: (status: boolean) => void;
  isSidebarHovered: boolean;
}

export const useToggleMobileSidebarStore = create<ToggleMobileSidebarState>(
  (set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    close: () => set((state) => ({ isOpen: false })),
    toggleMobileSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    isSidebarHovered: false,
    hoverSidebar: (isSidebarHovered) =>
      set({ isSidebarHovered: isSidebarHovered }),
  })
);
