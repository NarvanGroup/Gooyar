"use client";
import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  MenuItem,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import CustomFormLabel from "../../../forms/theme-elements/CustomFormLabel";
import CustomTextField from "../../../forms/theme-elements/CustomTextField";
import CustomSelect from "../../../forms/theme-elements/CustomSelect";
import Address from "./Address";
import Link from "next/link";
import { IconMail, IconMap, IconPhone } from "@tabler/icons-react";
import { SocialMedia } from "@/components/socialMedia";

const numbers = [
  {
    value: "one",
    label: "General Enquiry",
  },
  {
    value: "two",
    label: "General Enquiry 2",
  },
];

export const ShenasbanSocialMedia = [
  {
    name: "INSTAGRAM",
    username: "",
  },
  {
    name: "LINKEDIN",
    username: "",
  },
  {
    name: "X",
    username: "",
  },
  {
    name: "WHATSAPP",
    username: "+989306057083",
  },
  {
    name: "TELEGRAM",
    username: "+989306057083",
  },
  {
    name: "EMAIL",
    username: "info@nec.co.ir",
  },
  {
    name: "PHONE",
    username: "021 2591 7072",
  },
];

const Form = () => {
  const [number, setNumber] = React.useState("one");

  const handleChange3 = (event: any) => {
    setNumber(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          paddingTop: {
            xs: "40px",
            lg: "60px",
          },
          paddingBottom: {
            xs: "40px",
            lg: "90px",
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} lg={8} alignItems="center">
              <Stack spacing={3} alignItems="flex-start">
                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ typography: "subtitle2" }}
                  >
                    <IconMail />
                    {/* <Iconify icon="carbon:email" width={24} sx={{ mr: 1 }} /> پست */}
                    {/* الکترونیکی */}
                  </Stack>

                  <Link
                    color="inherit"
                    // variant="body2"
                    href="mailto:hello@example.com"
                  >
                    info@nec.co.ir
                  </Link>
                </Stack>

                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ typography: "subtitle2" }}
                  >
                    <IconPhone />
                    {/* <Iconify icon="carbon:mobile" width={24} sx={{ mr: 1 }} /> تلفن */}
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{
                      direction: "rtl !important",
                    }}
                  >
                    +98 21 2591 7072
                  </Typography>
                </Stack>

                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ typography: "subtitle2" }}
                  >
                    <IconMap />
                    {/* <Iconify icon="carbon:location" width={24} sx={{ mr: 1 }} />{" "} */}
                    {/* نشانی */}
                  </Stack>

                  <Typography variant="body2">ایران تهران تهران</Typography>
                </Stack>

                <Divider sx={{ borderStyle: "dashed", width: 1 }} />

                <Stack
                  spacing={1}
                  alignItems={{ xs: "center", md: "flex-start" }}
                >
                  <Typography variant="overline">
                    ما را در شبکه های اجتماعی دنبال کنید
                  </Typography>
                  <SocialMedia socials={ShenasbanSocialMedia} />
                </Stack>
              </Stack>
              {/* <form>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} lg={6} alignItems="center">
                    <CustomFormLabel htmlFor="fname" sx={{ mt: 0 }}>
                      First Name *
                    </CustomFormLabel>
                    <CustomTextField id="fname" placeholder="Name" fullWidth />
                  </Grid>
                  <Grid item xs={12} lg={6} alignItems="center">
                    <CustomFormLabel htmlFor="lname" sx={{ mt: 0 }}>
                      Last Name *
                    </CustomFormLabel>
                    <CustomTextField
                      id="lname"
                      placeholder="Last Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} lg={6} alignItems="center">
                    <CustomFormLabel htmlFor="phone" sx={{ mt: 0 }}>
                      Phone Number *
                    </CustomFormLabel>
                    <CustomTextField
                      id="phone"
                      placeholder="xxx xxx xxxx"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} lg={6} alignItems="center">
                    <CustomFormLabel htmlFor="txt-email" sx={{ mt: 0 }}>
                      Email *
                    </CustomFormLabel>
                    <CustomTextField
                      id="txt-email"
                      placeholder="Email address"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} alignItems="center">
                    <CustomFormLabel htmlFor="txt-enquire" sx={{ mt: 0 }}>
                      Enquire related to *
                    </CustomFormLabel>
                    <CustomSelect
                      fullWidth
                      id="txt-enquire"
                      variant="outlined"
                      value={number}
                      onChange={handleChange3}
                    >
                      {numbers.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </Grid>
                  <Grid item xs={12} alignItems="center">
                    <CustomFormLabel htmlFor="txt-message" sx={{ mt: 0 }}>
                      Message
                    </CustomFormLabel>
                    <CustomTextField
                      id="txt-message"
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder="Write your message here..."
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} alignItems="center">
                    <Button variant="contained" size="large">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form> */}
            </Grid>
            <Grid item xs={12} lg={4} alignItems="center">
              <Address />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Form;
