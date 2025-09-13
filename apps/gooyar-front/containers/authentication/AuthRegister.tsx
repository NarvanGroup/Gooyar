"use client";
import { Box, Typography, Button, Divider, Stack } from "@mui/material";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/components/forms/theme-elements/CustomFormLabel";
import { AuthSocialButtons } from "./AuthSocialButtons";
import { useForm, SubmitHandler } from "react-hook-form";

type RegisterFormInputs = {
  name: string;
  email: string;
  mobile: string;
  company: string;
};

const AuthRegister = ({
  title,
  subtitle,
  subtext,
  onSubmit,
}: {
  title?: string;
  subtitle: string | React.ReactNode;
  subtext: string | React.ReactNode;
  onSubmit?: (data: RegisterFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const handleFormSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <AuthSocialButtons title="ورود با" />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            یا
          </Typography>
        </Divider>
      </Box>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="name">نام</CustomFormLabel>
          <CustomTextField
            id="name"
            variant="outlined"
            fullWidth
            {...register("name", { required: "نام الزامی است" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <CustomFormLabel htmlFor="email">ایمیل</CustomFormLabel>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            {...register("email", { required: "ایمیل الزامی است" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <CustomFormLabel htmlFor="mobile">شماره موبایل</CustomFormLabel>
          <CustomTextField
            id="mobile"
            variant="outlined"
            fullWidth
            {...register("mobile", { required: "شماره موبایل الزامی است" })}
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
          />
          <CustomFormLabel htmlFor="company">نام شرکت</CustomFormLabel>
          <CustomTextField
            id="company"
            variant="outlined"
            fullWidth
            {...register("company", { required: "نام شرکت الزامی است" })}
            error={!!errors.company}
            helperText={errors.company?.message}
          />
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={isSubmitting}
        >
          ادامه
        </Button>
      </form>
      {subtitle}
    </>
  );
};

export default AuthRegister;
