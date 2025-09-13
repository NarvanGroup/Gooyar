"use client";
import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/components/forms/theme-elements/CustomFormLabel";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useResponsive from "@/shared/hooks/useResponsive";
import { Timer } from "@/components/timer";
import FormProvider, { RHFTextField } from "@/components/hook-form";

const schema = yup
  .object({
    otp: yup
      .string()
      .length(6, "کد تایید باید 6 رقم باشد")
      .required("وارد کردن کد تایید الزامی است"),
  })
  .required();

export const AuthVerificationStep = ({
  onSubmit,
  mobile,
  serverErrors,
  sendOTP,
}: {
  onSubmit: (data: { otp: string }) => void;
  mobile: string;
  serverErrors: any;
  sendOTP: () => void;
}) => {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  type FormData = yup.InferType<typeof schema>;

  const [timeRemained, setTimeRemained] = useState(2);
  const isSmDown = useResponsive("down", "sm");

  // const handleBack = () => setStep(authSteps.enterPhoneNumber);

  const handleSendOTP = () => {
    setTimeRemained(2);
    sendOTP();
  };

  useEffect(() => {
    if (serverErrors) {
      Object.keys(serverErrors)?.map((err: any) =>
        setError(err, {
          type: "manual",
          message: serverErrors[err],
        })
      );
    }
  }, [serverErrors]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box mt={4}>
        <Stack mb={3}>
          <Stack direction="row" spacing={1} mt={3} alignItems="center">
            <Typography
              color="textSecondary"
              variant="caption"
              fontWeight="400"
            >
              کد تایید برای شماره {mobile} ارسال شد
            </Typography>
            <Timer
              mins={timeRemained}
              setTimeRemained={setTimeRemained}
              onSendOTP={handleSendOTP}
            />
          </Stack>
          <CustomFormLabel htmlFor="code">
            کد تایید را وارد کنید
          </CustomFormLabel>
          <Stack spacing={2} direction="row">
            <RHFTextField name="otp" label="کد تایید" />
          </Stack>
        </Stack>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          size="large"
          fullWidth
        >
          تایید
        </Button>

        {/* <Stack direction="row" spacing={1} mt={3}>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            کد تایید را دریافت نکردید؟
          </Typography>
          <Typography
            onClick={handleSendOTP}
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              time
            }}
          >
            ارسال مجدد
          </Typography>
        </Stack> */}
      </Box>
    </FormProvider>
  );
};
