"use client";
import React from "react";
import {
  Box,
  Stack,
  Typography,
  Link,
  AvatarGroup,
  Container,
  Avatar,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const Contact = () => {
  //   sidebar
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  return (
    <Box
      bgcolor="primary.main"
      borderRadius={0}
      textAlign="center"
      py="14px"
      mt={5}
      position="relative"
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing="16px"
          justifyContent="center"
          alignItems="center"
        >
          <AvatarGroup>
            <Avatar
              alt="Remy Sharp"
              src="/images/profile/user-1.jpg"
              sx={{ width: 44, height: 44 }}
            />
            <Avatar
              alt="Travis Howard"
              src="/images/profile/user-2.jpg"
              sx={{ width: 44, height: 44 }}
            />
          </AvatarGroup>
          <Typography variant="body1" color="white" fontSize="16px">
            انتخاب شناس‌بان به معنای انتخاب اطمینان، شفافیت و امنیت در معاملات
            است{" "}
          </Typography>
          <Link
            href="/contact"
            underline="always"
            sx={{
              textDecorationColor: "white",
            }}
          >
            <Typography
              component="span"
              fontWeight={600}
              color="white"
              fontSize="16px"
            >
              مشاوره رایگان
            </Typography>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Contact;
