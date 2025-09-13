"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

interface KnowledgeBaseData {
  id: string;
  title: string;
  type: string;
  status: "completed" | "pending" | "failed";
  syncTime: string;
  characterCount: number;
  url?: string;
  notifications?: number;
}

interface EditDataDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: KnowledgeBaseData) => void;
  editingData: KnowledgeBaseData | null;
}

const EditDataDialog: React.FC<EditDataDialogProps> = ({
  open,
  onClose,
  onSubmit,
  editingData,
}) => {
  const [formData, setFormData] = useState<Partial<KnowledgeBaseData>>({});

  useEffect(() => {
    if (editingData) {
      setFormData({
        title: editingData.title,
        url: editingData.url,
      });
    }
  }, [editingData]);

  const handleSubmit = () => {
    if (editingData && formData.title?.trim()) {
      const updatedData = {
        ...editingData,
        ...formData,
      };
      onSubmit(updatedData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({});
    onClose();
  };

  if (!editingData) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>ویرایش داده</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="عنوان"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </Grid>
          {editingData.url && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="آدرس وب‌سایت"
                value={formData.url || ""}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>انصراف</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!formData.title?.trim()}
        >
          ذخیره تغییرات
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDataDialog;
