import { create } from "zustand";

interface AuthState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useAuthStateStore = create<AuthState>((set) => ({
  isOpen: false,
  open: () => set((state) => ({ isOpen: true })),
  close: () => set((state) => ({ isOpen: false })),
}));
