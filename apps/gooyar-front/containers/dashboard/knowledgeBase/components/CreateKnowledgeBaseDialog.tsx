"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

interface CreateKnowledgeBaseDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
}

const CreateKnowledgeBaseDialog: React.FC<CreateKnowledgeBaseDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = () => {
    if (formData.title.trim()) {
      onSubmit(formData);
      setFormData({ title: "", description: "" });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({ title: "", description: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle color="textPrimary">ایجاد پایگاه دانش جدید</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="عنوان پایگاه دانش"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="توضیحات"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>انصراف</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!formData.title.trim()}
        >
          ایجاد
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateKnowledgeBaseDialog;
