import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserModel } from "@/api/services/userServices/models";
import { logoutService, userProfileService } from "@/api/services/userServices";
import toast from "react-hot-toast";

// Type for the store
interface UserState {
  user: UserModel;
  isLoading: boolean;
  error?: string;
  setUserInformation: (user: Partial<UserModel>) => void;
  clearUserInformation: () => void;
  logout: () => void;
  getUserProfile: () => Promise<void>;
}

// Initial user object
const initialUser: UserModel = {
  first_name: "",
  last_name: "",
  father_name: "",
  nid: "",
  dob: "",
  mobile: "",
  email: "",
  isLoggedIn: false,
  hasPassword: false,
  instagram: "",
  wallets: [],
  national_id: "",
  birthdate: "",
  ended_at: "",
  started_at: "",
  inquiries_count: 0,
  inquiries_remaining: 0,
};

// Create the store with devtools and persistence
const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: initialUser,
        isLoading: true,
        error: "",
        setUserInformation: (user: Partial<UserModel>) =>
          set((state) => ({
            user: { ...state.user, ...user },
          })),
        clearUserInformation: () =>
          set(() => ({
            user: initialUser,
          })),
        logout: async () => {
          try {
            await logoutService();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.error("لطفا وارد شوید.");
            set(() => ({
              user: initialUser,
            }));
            window.location.href = "/";
          } catch (error) {
            console.error("Logout failed", error);
          }
        },
        getUserProfile: async () => {
          set(() => ({
            isLoading: true,
          }));
          try {
            const result = await userProfileService({});
            if (result.success) {
              set(() => ({
                user: { ...initialUser, ...result.data },
                isLoading: false,
              }));
            } else {
              set(() => ({
                error: result.message || "Failed to fetch user profile",
                isLoading: false,
              }));
            }
          } catch (error) {
            console.error("Error fetching user profile", error);
            set(() => ({
              error: "Error fetching user profile",
              isLoading: false,
            }));
          }
        },
      }),
      {
        name: "user-storage", // Local storage key
        partialize: (state) => ({ user: state.user }), // Only persist the user state
      }
    )
  )
);

export default useUserStore;
