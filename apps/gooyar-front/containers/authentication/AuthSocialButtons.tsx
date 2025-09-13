"use client";
import CustomSocialButton from "@/components/forms/theme-elements/CustomSocialButton";
import { Avatar, Box, Stack } from "@mui/material";

export const AuthSocialButtons = ({ title }: { title: string }) => (
  <>
    <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
      <CustomSocialButton>
        <Avatar
          src={"/images/svgs/google-icon.svg"}
          alt={"icon1"}
          sx={{
            width: 16,
            height: 16,
            borderRadius: 0,
            mr: 1,
          }}
        />
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            whiteSpace: "nowrap",
            mr: { sm: "3px" },
          }}
        >
          {title}{" "}
        </Box>{" "}
        گوگل
      </CustomSocialButton>
    </Stack>
  </>
);

export default AuthSocialButtons;
