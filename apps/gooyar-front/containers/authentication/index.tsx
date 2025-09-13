"use client";
import { useState } from "react";
import { Grid, Box, Card, Typography, Stack } from "@mui/material";
import Logo from "@/app/dashboard/layout/shared/logo/Logo";
import AuthRegister from "@/containers/authentication/AuthRegister";
import { AuthVerificationStep } from "@/containers/authentication/AuthVerificationStep";
import { loginOTPService, sendOTPService } from "@/api/services/userServices";
import toast from "react-hot-toast";
import { OTPLoginDataModel } from "@/api/services/userServices/models";
import useUserStore from "@/store/useUserStore";

export default function Auth() {
  const [step, setStep] = useState<"register" | "verify">("register");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState({});
  const { setUserInformation } = useUserStore();
  const [mobile, setMobile] = useState<string>("");

  const sendOTP = async (mobileNum?: string) => {
    setIsLoading(true);
    try {
      const result = await sendOTPService({
        mobile: mobileNum || mobile,
      });
      if (result.success) {
        toast.success("رمز یکبار مصرف ارسال شد.");
        setStep("verify");
      } else if (result.errors) {
        setServerErrors(result.errors);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulLogin = (result: any) => {
    toast.success("با موفقیت وارد شدید.");
    localStorage.setItem("token", JSON.stringify(result.token));
    localStorage.setItem("user", JSON.stringify(result.user));
    setUserInformation({ ...result.user, isLoggedIn: true });
  };

  const handleLoginOTP = async (data: { otp: string }) => {
    setIsLoading(true);
    try {
      const result = await loginOTPService({
        mobile,
        otp: data.otp,
      });
      if (result.success) {
        handleSuccessfulLogin(result.data);
      } else if (result.errors) {
        setServerErrors(result.errors);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = (data: {
    name: string;
    email: string;
    mobile: string;
    company: string;
  }) => {
    setStep("verify");
    setMobile(data.mobile);
    sendOTP(data.mobile);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "450px" }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              {step === "register" ? (
                <AuthRegister
                  subtext={
                    <Typography
                      variant="subtitle1"
                      textAlign="center"
                      color="textSecondary"
                      mb={1}
                    >
                      ورود / ثبت نام
                    </Typography>
                  }
                  subtitle={
                    <Stack direction="row" spacing={1} mt={3}>
                      <Typography
                        color="textSecondary"
                        variant="caption"
                        fontWeight="400"
                      >
                        با ورود و یا ثبت نام در گویار شما شرایط وقوانین استفاده
                        از سایت گویار وقوانین حریم خصوصی آن را می‌پذیرید.{" "}
                      </Typography>
                    </Stack>
                  }
                  onSubmit={handleRegisterSubmit}
                />
              ) : (
                <AuthVerificationStep
                  onSubmit={handleLoginOTP}
                  mobile={mobile}
                  sendOTP={sendOTP}
                  serverErrors={serverErrors}
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
