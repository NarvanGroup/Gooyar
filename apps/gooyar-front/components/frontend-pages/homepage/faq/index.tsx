"use client";
import * as React from "react";
import { Box, Container, Typography, Grid, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useState } from "react";

const FAQ = () => {
  const theme = useTheme();

  const questions = [
    {
      question: "شناس‌بان چیست و چگونه کار می‌کند؟",
      answer:
        "شناس‌بان سیستمی است که هویت خریداران را بررسی می‌کند و به فروشندگان کمک می‌کند از صحت اطلاعات وارد شده اطمینان حاصل کنند.",
    },
    {
      question: "چگونه شناس‌بان از کلاهبرداری جلوگیری می‌کند؟",
      answer:
        "با بررسی دقیق اطلاعات هویتی و تطبیق آن با منابع معتبر، شناس‌بان به فروشندگان کمک می‌کند تا با اطمینان معامله کنند.",
    },
    {
      question: "آیا اطلاعات کاربران محرمانه باقی می‌ماند؟",
      answer:
        "بله، امنیت اطلاعات کاربران اولویت اصلی شناس‌بان است و تمامی داده‌ها با رعایت بالاترین استانداردهای امنیتی ذخیره و پردازش می‌شوند.",
    },
    {
      question: "آیا استفاده از خدمات شناس‌بان هزینه دارد؟",
      answer:
        "بله، استفاده از خدمات شناس‌بان با هزینه‌ای منصفانه همراه است که بستگی به نوع و میزان استفاده شما دارد.",
    },
    {
      question: "شناس‌بان برای چه نوع فروشگاه‌هایی مناسب است؟",
      answer:
        "شناس‌بان برای طلافروشی‌ها، فروشگاه‌های کالاهای ارزشمند، و هر کسب‌وکاری که نیاز به اطمینان از هویت خریداران دارد مناسب است.",
    },
    {
      question: "چگونه می‌توانم با تیم پشتیبانی شناس‌بان تماس بگیرم؟",
      answer:
        "شما می‌توانید از طریق فرم تماس در سایت یا ایمیل پشتیبانی با ما در ارتباط باشید.",
    },
  ];

  const StyledAccordion = styled(Accordion)(({ theme }) => ({
    borderRadius: "8px",
    marginBottom: "16px !important",
    boxShadow:
      theme.palette.mode === "light"
        ? "0px 3px 0px rgba(235, 241, 246, 0.25)"
        : "unset",
    border: `1px solid ${theme.palette.divider}`,
    "&:before": {
      display: "none",
    },
    "&.Mui-expanded": {
      margin: "0",
    },
    "& .MuiAccordionSummary-root": {
      padding: "8px 24px",
      minHeight: "60px",
      fontSize: "18px",
      fontWeight: 500,
    },
    "& .MuiAccordionDetails-root": {
      padding: "0 24px 24px",
    },
  }));

  return (
    <Box pt={10} pb={10}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid size={{ xs: 12, lg: 8 }}>
            <Typography
              variant="h4"
              textAlign="center"
              lineHeight="1.2"
              sx={{
                fontSize: {
                  lg: "40px",
                  xs: "35px",
                },
              }}
              fontWeight="700"
            >
              سوالات متداول
            </Typography>
            <Box mt={7}>
              {questions.map((q, index) => (
                <StyledAccordion key={index}>
                  <AccordionSummary
                    expandIcon={<IconPlus size="21" stroke="1.5" />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    {q.question}
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{q.answer}</Typography>
                  </AccordionDetails>
                </StyledAccordion>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box
              mt={5}
              borderRadius="8px"
              display="inline-flex"
              justifyContent="center"
              gap="4px"
              alignItems="center"
              fontWeight={500}
              sx={{
                border: `1px dashed ${theme.palette.divider}`,
                padding: "7px 10px",
                cursor: "pointer",
                "&:hover": {
                  borderColor: "primary.main",
                },
              }}
            >
              <Typography>همچنان سوال دارید؟</Typography>
              <a aria-label="telephone" href={`tel:00982125917072`}>
                با ما در تماس باشید
              </a>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQ;
