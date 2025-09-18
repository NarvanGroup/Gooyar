"use client";
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  CardContent,
  ListItemIcon,
  Chip,
  Switch,
  useTheme,
  styled,
} from "@mui/material";
import BlankCard from "@/components/shared/BlankCard";
import Image from "next/image";
import { IconCheck, IconX } from "@tabler/icons-react";

const pricing = [
  {
    id: 1,
    package: "نقره‌ای",
    monthlyplan: "989,000",
    yearlyplan: "2,388,000",
    yearlyplanWithDiscount: "1,999,000",
    avatar: "/images/backgrounds/silver.png",
    badge: false,
    btntext: "خرید نقره‌ای",
    rules: [
      // {
      //   limit: true,
      //   title: "2 کاربره",
      // },
      {
        limit: true,
        title: "50 استعلام",
      },
      {
        limit: true,
        title: "لیست استعلام ها",
      },
      {
        limit: true,
        title: "لیست مشتریان",
      },
      {
        limit: true,
        title: "استعلام کارت بانکی",
      },
    ],
  },
  {
    id: 2,
    package: "طلایی",
    monthlyplan: "1,899,000",
    yearlyplan: "3,588,000",
    yearlyplanWithDiscount: "2,499,000",
    avatar: "/images/backgrounds/gold.png",
    badge: true,
    btntext: "خرید طلایی",
    rules: [
      // {
      //   limit: true,
      //   title: "چند کاربره",
      // },
      {
        limit: true,
        title: "100 استعلام",
      },
      {
        limit: true,
        title: "لیست استعلام ها",
      },
      {
        limit: true,
        title: "لیست مشتریان",
      },
      {
        limit: true,
        title: "استعلام کارت بانکی",
      },
    ],
  },
  {
    id: 3,
    package: "برنزی",
    plan: "bronze",
    monthlyplan: "499,000",
    avatar: "/images/backgrounds/bronze.png",
    badge: false,
    // btntext: "اشتراک برنزی برای شما فعال است.",
    btntext: "خرید برنزی",
    rules: [
      // {
      //   limit: true,
      //   title: "1 کاربره",
      // },
      {
        limit: true,
        title: "25 استعلام",
      },
      {
        limit: true,
        title: "لیست استعلام ها",
      },
      {
        limit: true,
        title: "لیست مشتریان",
      },
      {
        limit: true,
        title: "استعلام کارت بانکی",
      },
    ],
  },
];

const Pricing = () => {
  const [show, setShow] = React.useState(false);

  const yearlyPrice = (a: any, b: number) => a * b;

  const theme = useTheme();
  const warninglight = theme.palette.warning.light;
  const warning = theme.palette.warning.main;

  const StyledChip = styled(Chip)({
    position: "absolute",
    top: "15px",
    right: "30px",
    backgroundColor: warninglight,
    color: warning,
    textTransform: "uppercase",
    fontSize: "11px",
  });

  return (
    <>
      <Box
        sx={{
          py: {
            xs: 5,
            lg: 15,
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid size={{ xs: 12, lg: 7 }}>
              <Typography
                textAlign="center"
                variant="h4"
                lineHeight={1.4}
                // mb={1}
                fontWeight={700}
                sx={{
                  fontSize: {
                    lg: "40px",
                    xs: "35px",
                  },
                }}
              >
                مورد اعتماد بیش از 2000 فروشگاه
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={3} justifyContent="center" mt={3}>
            <Grid size={{ xs: 12, sm: 10, lg: 8 }} textAlign="center">
              {/* <Typography variant="h2">
                Flexible Plans Tailored to Fit Your Community&apos;s Unique
                Needs!
              </Typography> */}
              <Box
                display="flex"
                alignItems="center"
                mt={3}
                justifyContent="center"
              >
                <Typography variant="subtitle1">ماهانه</Typography>
                <Switch disabled onChange={() => setShow(!show)} />
                <Typography variant="subtitle1">
                  سالانه (با تخفیف ویژه)
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={5}>
            {pricing.map((price, i) => (
              <Grid size={{ xs: 12, lg: 4, sm: 6 }} key={i}>
                <BlankCard>
                  <CardContent sx={{ p: "30px" }}>
                    {price.badge ? (
                      <StyledChip label="پرطرفدار" size="small"></StyledChip>
                    ) : null}

                    <Typography
                      variant="subtitle1"
                      fontSize="12px"
                      mb={3}
                      color="textSecondary"
                      textTransform="uppercase"
                    >
                      {price.package}
                    </Typography>
                    <Image
                      src={price.avatar}
                      alt={price.avatar}
                      width={90}
                      height={90}
                    />
                    <Box my={4}>
                      {price.plan == "Free" ? (
                        <Box fontSize="50px" mt={5} fontWeight="600">
                          {/* {price.plan} */}
                          رایگان
                        </Box>
                      ) : (
                        <Box display="flex">
                          {show ? (
                            <>
                              <Typography
                                sx={{
                                  textDecoration: "line-through",
                                }}
                                fontSize="14px"
                                fontWeight="450"
                                color="textSecondary"
                              >
                                {/* {yearlyPrice(`${price.monthlyplan}`, 12)} */}
                                {/* {price.yearlyplan} */}
                              </Typography>
                              <Typography fontSize="48px" fontWeight="600">
                                {/* {yearlyPrice(`${price.monthlyplan}`, 12)}  
                                {price.yearlyplanWithDiscount} */}
                                به زودی
                              </Typography>
                              {/* <Typography
                                fontSize="15px"
                                fontWeight={400}
                                ml={1}
                                color="textSecondary"
                                mt={1}
                              >
                                /سال
                              </Typography> */}
                            </>
                          ) : (
                            <>
                              <Typography fontSize="48px" fontWeight="600">
                                {price.monthlyplan}
                                {/* به زودی */}
                              </Typography>
                              {/* <Typography
                                fontSize="15px"
                                fontWeight={400}
                                ml={1}
                                color="textSecondary"
                                mt={1}
                              >
                                /ماه
                              </Typography> */}
                            </>
                          )}
                          <Typography
                            fontSize="12px"
                            variant="h6"
                            ml="8px"
                            mt="-12px"
                          >
                            تومان
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Box mt={3}>
                      <List>
                        {price.rules.map((rule, i) => (
                          <Box key={i}>
                            {rule.limit ? (
                              <>
                                <ListItem disableGutters>
                                  <ListItemIcon
                                    sx={{
                                      color: "primary.main",
                                      minWidth: "32px",
                                    }}
                                  >
                                    <IconCheck width={18} />
                                  </ListItemIcon>
                                  <ListItemText>{rule.title}</ListItemText>
                                </ListItem>
                              </>
                            ) : (
                              <ListItem
                                disableGutters
                                sx={{ color: "grey.400" }}
                              >
                                <ListItemIcon
                                  sx={{ color: "grey.400", minWidth: "32px" }}
                                >
                                  <IconX width={18} />
                                </ListItemIcon>
                                <ListItemText>{rule.title}</ListItemText>
                              </ListItem>
                            )}
                          </Box>
                        ))}
                      </List>
                    </Box>

                    <Button
                      sx={{ width: "100%", mt: 3 }}
                      variant="contained"
                      size="large"
                      color="primary"
                      disabled={price.plan === "Free"}
                    >
                      {price.btntext}
                    </Button>
                  </CardContent>
                </BlankCard>
              </Grid>
            ))}
          </Grid>

          {/* <PaymentMethods /> */}
        </Container>
      </Box>
    </>
  );
};

export default Pricing;
