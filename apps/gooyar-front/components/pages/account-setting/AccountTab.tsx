"use client";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

// components
import BlankCard from "../../shared/BlankCard";
import CustomTextField from "../../forms/theme-elements/CustomTextField";
import CustomFormLabel from "../../forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/material";
import FormProvider, {
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from "@/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFDataPicker from "@/components/hook-form/RHFDataPicker";
import { userProfileService } from "@/api/services/userServices";
import { UserModel } from "@/api/services/userServices/models";
import useUserStore from "@/store/useUserStore";
import { LoadingButton } from "@mui/lab";

// locations
const locations = [
  {
    value: "Gold",
    label: "طلا",
  },
  {
    value: "Mobile",
    label: "موبایل",
  },
  {
    value: "Appliance",
    label: "لوازم خانگی",
  },
];

const AccountTab = () => {
  const validationSchema = yup.object({
    firstName: yup.string().required("Firstname is Required"),
    lastName: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Lastname is Required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    birthday: yup.string().required("Birthday is required"),
    gender: yup.string().required("Gender is required"),
  });

  const defaultValues = {
    first_name: "",
    last_name: "",
    father_name: "",
    email: "",
    image: "",
    mobile: "",
    birthdate: null,
    gender: "",
    name: "",
    senf: null,
    address: "",
  };

  const methods = useForm<any>({
    // resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { setUserInformation } = useUserStore();

  const onSubmit = async (data: any) => {
    try {
      const result = await userProfileService({
        data,
        // birthdate: data?.birthdate.format("YYYY-MM-DD"),
      });
      reset(result?.data);
      setUserInformation(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  const getUserProfile = async () => {
    setIsLoading(true);
    try {
      const result = await userProfileService({});
      if (result.success) {
        reset(result?.data);
        setUserInformation(result.data);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Edit Details */}
      <Grid item xs={12}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <BlankCard>
            <CardContent>
              <Typography variant="h5" mb={1}>
                اطلاعات شخصی
              </Typography>
              {/* <Typography color="textSecondary" mb={3}>
              To change your personal detail , edit and save from here
            </Typography> */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-name"
                  >
                    نام
                  </CustomFormLabel>
                  <RHFTextField
                    name="first_name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 2 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-store-name"
                  >
                    نام خانوادگی
                  </CustomFormLabel>
                  <RHFTextField variant="outlined" fullWidth name="last_name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 6 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-phone"
                  >
                    شماره همراه
                  </CustomFormLabel>
                  <RHFTextField
                    disabled
                    variant="outlined"
                    fullWidth
                    name="mobile"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 2 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-store-name"
                  >
                    کدملی
                  </CustomFormLabel>
                  <RHFTextField
                    variant="outlined"
                    fullWidth
                    name="national_id"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 2 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-store-name"
                  >
                    تاریخ تولد
                  </CustomFormLabel>
                  <RHFDataPicker name="birthdate" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-name"
                  >
                    جنسیت
                  </CustomFormLabel>
                  <RHFRadioGroup
                    row
                    options={[
                      {
                        value: "female",
                        label: "زن",
                      },
                      {
                        value: "male",
                        label: "مرد",
                      },
                    ]}
                    name="gender"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  {/* 3 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-location"
                  >
                    صنف
                  </CustomFormLabel>
                  <RHFSelect name="senf">
                    {locations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 5 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    نام فروشگاه
                  </CustomFormLabel>
                  <RHFTextField variant="outlined" fullWidth name="name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 5 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    ایمیل
                  </CustomFormLabel>
                  <RHFTextField
                    id="text-email"
                    // value="info@modernize.com"
                    variant="outlined"
                    fullWidth
                    name="email"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  {/* 7 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-address"
                  >
                    آدرس
                  </CustomFormLabel>
                  <RHFTextField
                    id="text-address"
                    // value="814 Howard Street, 120065, India"
                    variant="outlined"
                    fullWidth
                    name="address"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </BlankCard>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "end" }}
            mt={3}
          >
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              disabled
            >
              ذخیره
            </LoadingButton>
            {/* <Button size="large" variant="text" color="error">
              Cancel
            </Button> */}
          </Stack>
        </FormProvider>
      </Grid>
      {/* Change Profile */}
      {/* <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Change Profile
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Change your profile picture from here
            </Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box>
                <Avatar
                  src={"/images/profile/user-1.jpg"}
                  alt={"user1"}
                  sx={{ width: 120, height: 120, margin: "0 auto" }}
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  my={3}
                >
                  <Button variant="contained" color="primary" component="label">
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                  <Button variant="outlined" color="error">
                    Reset
                  </Button>
                </Stack>
                <Typography variant="subtitle1" color="textSecondary" mb={4}>
                  Allowed JPG, GIF or PNG. Max size of 800K
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid> */}
      {/*  Change Password */}
      {/* <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Change Password
            </Typography>
            <Typography color="textSecondary" mb={3}>
              To change your password please confirm here
            </Typography>
            <form>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-cpwd"
              >
                Current Password
              </CustomFormLabel>
              <CustomTextField
                id="text-cpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
               <CustomFormLabel htmlFor="text-npwd">
                New Password
              </CustomFormLabel>
              <CustomTextField
                id="text-npwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
        
              <CustomFormLabel htmlFor="text-conpwd">
                Confirm Password
              </CustomFormLabel>
              <CustomTextField
                id="text-conpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
            </form>
          </CardContent>
        </BlankCard>
      </Grid> */}
    </Grid>
  );
};

export default AccountTab;
