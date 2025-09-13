"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Alert,
  Snackbar,
  Container,
  Paper,
  Fab,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import CalendarManager from "./CalendarManager";

export default function Calendars() {
  return <CalendarManager />;
}
