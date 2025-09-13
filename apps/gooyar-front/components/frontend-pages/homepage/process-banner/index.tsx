import React from "react";
import {
  Box,
  Typography,
  MobileStepper,
  Button,
  Paper,
  Container,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  useMediaQuery,
  Avatar,
  Theme,
  Badge,
} from "@mui/material";
import { useTheme } from "@emotion/react";

interface Step {
  label: string;
  description: string;
}

const steps: Step[] = [
  {
    label: "ورود اطلاعات",
    description: " اطلاعات اولیه خریدار را وارد کنید تا فرایند بررسی آغاز شود",
  },
  {
    label: "بررسی هویت",
    description:
      "سیستم شناس‌بان هویت کاربر را بررسی کرده و از اصالت اطلاعات اطمینان حاصل می‌کند",
  },
  {
    label: "بازگشت وضعیت تأیید شده",
    description:
      "وضعیت بررسی به فروشنده اعلام می‌شود تا با اطمینان معامله را ادامه دهد",
  },
];

const ProcessBanner: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const icons = [
    "/images/file-and-folder-min.png",
    "/images/evidence-min.png",
    "/images/account-min.png",
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep === 0 ? maxSteps - 1 : prevStep - 1));
  };

  return (
    <Container
      sx={{
        maxWidth: "1400px !important",
        my: 5,
        p: 3,
      }}
    >
      <Box
        bgcolor="primary.light"
        borderRadius="24px"
        sx={{
          py: { xs: "40px", lg: "70px" },
          px: { xs: 3, lg: 5 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          mb="40px"
          fontWeight={700}
          fontSize="2.5rem"
          //   color="primary.contrastText"
          lineHeight="1.3"
        >
          چگونه شناس‌بان از کلاهبرداری جلوگیری می‌کند؟
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          mb="50px"
          fontSize="1.2rem"
          sx={{ lineHeight: 1.7 }}
        >
          شناس‌بان با انجام بررسی‌های دقیق هویت، از ورود افراد ناشناس و غیرقابل
          اعتماد به فرایند خرید جلوگیری می‌کند. با تأیید اصالت خریداران، ریسک
          کلاهبرداری به میزان قابل توجهی کاهش می‌یابد.{" "}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Grid container spacing={isMobile ? 2 : 4} alignItems="center">
            {steps.map((step, index) => (
              <Grid
                item
                xs={12}
                sm={4}
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Badge badgeContent={index + 1}>
                  <Avatar
                    sx={{
                      bgcolor: "transparent",
                      color: "white",
                      width: 64,
                      height: 64,
                      mb: 1,
                    }}
                    src={icons[index]}
                  ></Avatar>
                </Badge>

                <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
                  {step.label}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
                  {step.description}
                </Typography>
                {/* {index < steps.length - 1 && (
                  <Box
                    sx={{
                      width: "100%",
                      height: 2,
                      backgroundColor: theme.palette.grey[300],
                      mt: 2,
                      maxWidth: isMobile ? "80%" : "100%",
                    }}
                  />
                )} */}
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* <Stepper
          sx={
            {
              // maxWidth: "60%",
            }
          }
          activeStep={activeStep}
          orientation="vertical"
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "1.2rem", // Adjust font size as needed
                    fontWeight: 500,
                  },
                }}
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "اتمام" : "بعدی"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    قبلی
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button sx={{ mt: 1, mr: 1 }}>Reset</Button>
          </Paper>
        )} */}
      </Box>
    </Container>
  );
};

export default ProcessBanner;
