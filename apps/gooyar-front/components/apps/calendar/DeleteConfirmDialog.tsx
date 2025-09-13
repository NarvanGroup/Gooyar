import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Warning } from "@mui/icons-material";

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Warning color="warning" />
          تأیید حذف
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography>
          آیا مطمئن هستید که می‌خواهید تقویم "{title}" را حذف کنید؟ این عملیات
          قابل بازگشت نیست.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>انصراف</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}
