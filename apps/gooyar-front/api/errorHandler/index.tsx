// import { logout } from "@/redux/features/userSlice";
// import toast from "react-hot-toast";

import toast from "react-hot-toast";

export const errorHandler = (response: { status: number }, dispatch?: any) => {
  if (response.status === 401) {
    window.location.href = "/";
    // dispatch(setAuthModalState(true))
    // dispatch(logout());
    // Router.push("/");
    // logoutUser();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();
    toast.error("لطفا وارد شوید.");
    // state.user = { ...initialState.user };
  }
  if (response.status === 500) {
    toast.error("در حال حاضر سرور قادر به پاسخگویی نیست.");
  }
  if (response.status === 429) {
    toast.error("لطفا بعدا تلاش کنید.");
  }
};
