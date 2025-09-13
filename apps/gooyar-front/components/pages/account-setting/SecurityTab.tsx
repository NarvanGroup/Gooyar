import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// components
import BlankCard from "../../shared/BlankCard";
import {
  IconDeviceLaptop,
  IconDeviceMobile,
  IconDotsVertical,
} from "@tabler/icons-react";
import FormProvider, {
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from "@/components/hook-form";
import CustomFormLabel from "@/components/forms/theme-elements/CustomFormLabel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Stack } from "@mui/material";

const SecurityTab = () => {
  const validationSchema = yup.object({
    firstName: yup
      .string()

      .required("Firstname is Required"),
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
    dob: null,
    gender: "",
  };
  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      // const result = await updateUserProfileService({
      //   ...data,
      //   // dob: data?.dob.format("YYYY-MM-DD"),
      // });
      // reset(result?.data);
      // dispatch(setUserInformation({ user: result.data }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <BlankCard>
              <CardContent>
                <Typography variant="h5" mb={1}>
                  احراز هویت
                </Typography>
                <Typography color="textSecondary" mb={3}>
                  اطلاعات وارد شده باید مطابق شماره همراه باشد.
                </Typography>
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
                      name="name"
                      id="text-name"
                      // value="Mathew Anderson"
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
                    <RHFTextField
                      id="text-store-name"
                      // value="Maxima Studio"
                      variant="outlined"
                      fullWidth
                      name=""
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomFormLabel
                      sx={{
                        mt: 0,
                      }}
                      htmlFor="text-name"
                    >
                      نام پدر
                    </CustomFormLabel>
                    <RHFTextField
                      id="text-name"
                      // value="Mathew Anderson"
                      variant="outlined"
                      fullWidth
                      name=""
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
                      id="text-store-name"
                      // value="Maxima Studio"
                      variant="outlined"
                      fullWidth
                      name=""
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
                    <RHFTextField
                      id="text-store-name"
                      // value="Maxima Studio"
                      variant="outlined"
                      fullWidth
                      name=""
                    />
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
                      id="text-name"
                      // value="Mathew Anderson"

                      name=""
                    />
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
                      id="text-phone"
                      // value="+91 12345 65478"
                      variant="outlined"
                      fullWidth
                      name=""
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
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                disabled
              >
                ذخیره
              </Button>
              {/* <Button size="large" variant="text" color="error">
              Cancel
            </Button> */}
            </Stack>
          </FormProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default SecurityTab;
