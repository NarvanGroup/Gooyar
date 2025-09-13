import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Add, Delete, Close } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Calendar,
  CalendarFormData,
  Availability,
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_FA,
} from "./types";

interface CalendarFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CalendarFormData) => void;
  calendar?: Calendar | null;
  isEdit?: boolean;
}

export default function CalendarForm({
  open,
  onClose,
  onSubmit,
  calendar,
  isEdit = false,
}: CalendarFormProps) {
  const [formData, setFormData] = useState<CalendarFormData>({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    availabilities: [{ days: [], time_span: "" }],
    google_email: "",
    is_google_connected: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (calendar && isEdit) {
      setFormData({
        title: calendar.title,
        description: calendar.description,
        start_time: calendar.start_time,
        end_time: calendar.end_time || "",
        availabilities: [...calendar.availabilities],
        google_email: calendar.google_email,
        is_google_connected: calendar.is_google_connected,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        availabilities: [],
        google_email: "",
        is_google_connected: false,
      });
    }
    setErrors({});
  }, [calendar, isEdit, open]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "عنوان الزامی است";
    }

    if (!formData.description.trim()) {
      newErrors.description = "توضیحات الزامی است";
    }

    if (!formData.start_time) {
      newErrors.start_time = "زمان شروع الزامی است";
    }

    if (formData.availabilities.length === 0) {
      newErrors.availabilities = "حداقل یک زمان در دسترس الزامی است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const addAvailability = () => {
    setFormData((prev) => ({
      ...prev,
      availabilities: [...prev.availabilities, { days: [], time_span: "" }],
    }));
  };

  const removeAvailability = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      availabilities: prev.availabilities.filter((_, i) => i !== index),
    }));
  };

  const updateAvailability = (
    index: number,
    field: keyof Availability,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      availabilities: prev.availabilities.map((availability, i) =>
        i === index ? { ...availability, [field]: value } : availability
      ),
    }));
  };

  const toggleDay = (availabilityIndex: number, day: string) => {
    const availability = formData.availabilities[availabilityIndex];
    const days = availability.days.includes(day)
      ? availability.days.filter((d) => d !== day)
      : [...availability.days, day];

    updateAvailability(availabilityIndex, "days", days);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          color: "text.primary",
        }}
      >
        {isEdit ? "ویرایش تقویم" : "افزودن تقویم جدید"}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="عنوان"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              error={!!errors.title}
              helperText={errors.title}
              margin="normal"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="توضیحات"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              error={!!errors.description}
              helperText={errors.description}
              margin="normal"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="تاریخ و زمان شروع"
                value={
                  formData.start_time ? new Date(formData.start_time) : null
                }
                onChange={(newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    start_time: newValue ? newValue.toISOString() : "",
                  }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    error: !!errors.start_time,
                    helperText: errors.start_time,
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="تاریخ و زمان پایان (اختیاری)"
                value={formData.end_time ? new Date(formData.end_time) : null}
                onChange={(newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    end_time: newValue ? newValue.toISOString() : "",
                  }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="ایمیل گوگل"
              value={formData.google_email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  google_email: e.target.value,
                }))
              }
              error={!!errors.google_email}
              helperText={errors.google_email}
              margin="normal"
            />
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FormControlLabel
              sx={{
                color: "text.primary",
              }}
              control={<Switch />}
              label="اتصال به google calendar"
              checked={formData.is_google_connected}
              onChange={(e: any) =>
                setFormData((prev) => ({
                  ...prev,
                  is_google_connected: e.target.checked,
                }))
              }
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              color: "text.primary",
            }}
            variant="h6"
          >
            زمان‌های در دسترس
          </Typography>
          <Button
            startIcon={<Add />}
            onClick={addAvailability}
            variant="outlined"
            size="small"
          >
            افزودن زمان
          </Button>
        </Box>

        {errors.availabilities && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.availabilities}
          </Alert>
        )}

        {formData.availabilities.map((availability, index) => (
          <Box
            key={index}
            sx={{
              mb: 3,
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  color: "primary.main",
                }}
                variant="subtitle1"
              >
                زمان در دسترس {index + 1}
              </Typography>
              <IconButton
                size="small"
                color="error"
                onClick={() => removeAvailability(index)}
              >
                <Delete />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  sx={{
                    color: "text.primary",
                  }}
                  variant="body2"
                  gutterBottom
                >
                  انتخاب روزها:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {DAYS_OF_WEEK.map((day, dayIndex) => (
                    <Chip
                      key={day}
                      label={DAYS_OF_WEEK_FA[dayIndex]}
                      onClick={() => toggleDay(index, day)}
                      variant={
                        availability.days.includes(day) ? "filled" : "outlined"
                      }
                      color={
                        availability.days.includes(day) ? "primary" : "default"
                      }
                      size="small"
                    />
                  ))}
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="بازه زمانی (مثال: 09:00 - 17:00)"
                  value={availability.time_span}
                  onChange={(e) =>
                    updateAvailability(index, "time_span", e.target.value)
                  }
                  placeholder="09:00 - 17:00"
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Box>
        ))}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>انصراف</Button>
        <Button onClick={handleSubmit} variant="contained">
          {isEdit ? "بروزرسانی" : "ایجاد"} تقویم
        </Button>
      </DialogActions>
    </Dialog>
  );
}
