"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Grid,
  Container,
} from "@mui/material";
import PhoneNumbers from "./PhoneNumbers";
import WhatsAppAccounts from "./WhatsAppAccounts";
import TelegramAccounts from "./TelegramAccounts";
import InstagramAccounts from "./InstagramAccounts";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`contact-tabpanel-${index}`}
      aria-labelledby={`contact-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `contact-tab-${index}`,
    "aria-controls": `contact-tabpanel-${index}`,
  };
}

export default function ContactPoints() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", mt: 3 }}>
        <>
          <>
            <Typography variant="h4" gutterBottom color="textPrimary">
              مدیریت شماره ها و شبکه های اجتماعی
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              مدیریت شماره ها و شبکه های اجتماعی برای ارتباط با مشتریان
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="contact points tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="شماره های تلفن" {...a11yProps(0)} />
                <Tab label="واتساپ" {...a11yProps(1)} />
                <Tab label="تلگرام" {...a11yProps(2)} />
                <Tab label="اینستاگرام" {...a11yProps(3)} />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <PhoneNumbers />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <WhatsAppAccounts />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <TelegramAccounts />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <InstagramAccounts />
            </TabPanel>
          </>
        </>
      </Box>
    </Container>
  );
}
