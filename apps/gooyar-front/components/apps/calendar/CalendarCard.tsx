import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import { Edit, Delete, Schedule, AccessTime } from "@mui/icons-material";
import { Calendar, DAYS_OF_WEEK, DAYS_OF_WEEK_SHORT_FA } from "./types";

interface CalendarCardProps {
  calendar: Calendar;
  onEdit: (calendar: Calendar) => void;
  onDelete: (id: string) => void;
}

export default function CalendarCard({
  calendar,
  onEdit,
  onDelete,
}: CalendarCardProps) {
  const formatTime = (time: string) => {
    return time.replace("T", " ");
  };

  const getDayAbbreviation = (day: string) => {
    const dayIndex = DAYS_OF_WEEK.indexOf(day as any);
    return dayIndex >= 0 ? DAYS_OF_WEEK_SHORT_FA[dayIndex] : day;
  };
  console.log("test");
  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 400,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {calendar.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {calendar.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Schedule sx={{ fontSize: 16, mr: 1, color: "primary.main" }} />
            <Typography variant="body2">
              شروع: {formatTime(calendar.start_time)}
            </Typography>
          </Box>

          {calendar.end_time && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <AccessTime
                sx={{ fontSize: 16, mr: 1, color: "secondary.main" }}
              />
              <Typography variant="body2">
                پایان: {formatTime(calendar.end_time)}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          زمان‌های در دسترس:
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {calendar.availabilities.map((availability, index) => (
            <Box key={index} sx={{ p: 1, bgcolor: "grey.50", borderRadius: 1 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
                {DAYS_OF_WEEK.map((day) => (
                  <Chip
                    key={day}
                    label={getDayAbbreviation(day)}
                    size="small"
                    variant={
                      availability.days.includes(day) ? "filled" : "outlined"
                    }
                    color={
                      availability.days.includes(day) ? "primary" : "default"
                    }
                    sx={{ fontSize: "0.7rem" }}
                  />
                ))}
              </Box>
              <Typography variant="body2" color="primary">
                {availability.time_span}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
        <IconButton
          size="small"
          color="primary"
          onClick={() => onEdit(calendar)}
        >
          <Edit />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete(calendar.id)}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}
