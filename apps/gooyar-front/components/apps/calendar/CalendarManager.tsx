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

import CalendarCard from "./CalendarCard";
import CalendarForm from "./CalendarForm";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { Calendar, CalendarFormData } from "./types";
import { sampleCalendars } from "./sampleData";

export default function CalendarManager() {
  const [calendars, setCalendars] = useState<Calendar[]>(sampleCalendars);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCalendar, setEditingCalendar] = useState<Calendar | null>(null);
  const [deletingCalendar, setDeletingCalendar] = useState<Calendar | null>(
    null
  );
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleAddCalendar = () => {
    setEditingCalendar(null);
    setFormOpen(true);
  };

  const handleEditCalendar = (calendar: Calendar) => {
    setEditingCalendar(calendar);
    setFormOpen(true);
  };

  const handleDeleteCalendar = (id: string) => {
    const calendar = calendars.find((c) => c.id === id);
    if (calendar) {
      setDeletingCalendar(calendar);
      setDeleteDialogOpen(true);
    }
  };

  const handleFormSubmit = (data: CalendarFormData) => {
    if (editingCalendar) {
      // Update existing calendar
      const updatedCalendar: Calendar = {
        ...editingCalendar,
        ...data,
        updated_at: new Date(),
      };

      setCalendars((prev) =>
        prev.map((cal) =>
          cal.id === editingCalendar.id ? updatedCalendar : cal
        )
      );

      setSnackbar({
        open: true,
        message: "تقویم با موفقیت بروزرسانی شد!",
        severity: "success",
      });
    } else {
      // Create new calendar
      const newCalendar: Calendar = {
        id: Date.now().toString(),
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      };

      setCalendars((prev) => [...prev, newCalendar]);

      setSnackbar({
        open: true,
        message: "تقویم با موفقیت ایجاد شد!",
        severity: "success",
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deletingCalendar) {
      setCalendars((prev) =>
        prev.filter((cal) => cal.id !== deletingCalendar.id)
      );

      setSnackbar({
        open: true,
        message: "تقویم با موفقیت حذف شد!",
        severity: "success",
      });

      setDeleteDialogOpen(false);
      setDeletingCalendar(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                color: "text.primary",
              }}
            >
              مدیریت تقویم
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddCalendar}
              size="large"
            >
              افزودن تقویم
            </Button>
          </Box>

          {/* Calendar List */}
          {calendars.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                تقویمی یافت نشد
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                اولین تقویم خود را ایجاد کنید
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddCalendar}
              >
                ایجاد تقویم
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {calendars.map((calendar) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={calendar.id}>
                  <CalendarCard
                    calendar={calendar}
                    onEdit={handleEditCalendar}
                    onDelete={handleDeleteCalendar}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Floating Action Button for Mobile */}
          <Fab
            color="primary"
            aria-label="add calendar"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              display: { xs: "flex", md: "none" },
            }}
            onClick={handleAddCalendar}
          >
            <Add />
          </Fab>
        </Box>

        {/* Calendar Form Dialog */}
        <CalendarForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
          calendar={editingCalendar}
          isEdit={!!editingCalendar}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setDeletingCalendar(null);
          }}
          onConfirm={handleConfirmDelete}
          title={deletingCalendar?.title || ""}
        />

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
}
