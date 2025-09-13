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
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
} from "@mui/material";
import {
  Info as InfoIcon,
  TextFields as TextFieldsIcon,
  Language as LanguageIcon,
  Description as DescriptionIcon,
  YouTube as YouTubeIcon,
  YouTube as NotionIcon,
  YouTube as WordPressIcon,
  Api as ApiIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";

interface AddDataDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const dataTypes = [
  { value: "faq", label: "سوالات متداول", icon: <InfoIcon /> },
  { value: "content", label: "محتوای متنی", icon: <TextFieldsIcon /> },
  { value: "website", label: "وب‌سایت", icon: <LanguageIcon /> },
  { value: "content_file", label: "فایل محتوا", icon: <DescriptionIcon /> },
  { value: "youtube", label: "یوتیوب", icon: <YouTubeIcon /> },
  { value: "notion", label: "نوشن", icon: <NotionIcon /> },
  { value: "wordpress", label: "وردپرس", icon: <WordPressIcon /> },
  { value: "api", label: "API", icon: <ApiIcon /> },
];

const steps = ["انتخاب نوع داده", "ورود اطلاعات"];

const AddDataDialog: React.FC<AddDataDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    url: "",
    file: null as File | null,
    apiKey: "",
    apiUrl: "",
    notionToken: "",
    notionPageId: "",
    wordpressUrl: "",
    wordpressUsername: "",
    wordpressPassword: "",
    youtubeUrl: "",
  });

  const handleNext = () => {
    if (activeStep === 0 && selectedType) {
      setActiveStep(1);
    } else if (activeStep === 1) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const handleSubmit = () => {
    const data = {
      type: selectedType,
      ...formData,
    };
    onSubmit(data);
    handleClose();
  };

  const handleClose = () => {
    setActiveStep(0);
    setSelectedType("");
    setFormData({
      title: "",
      content: "",
      url: "",
      file: null,
      apiKey: "",
      apiUrl: "",
      notionToken: "",
      notionPageId: "",
      wordpressUrl: "",
      wordpressUsername: "",
      wordpressPassword: "",
      youtubeUrl: "",
    });
    onClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData({ ...formData, file });
  };

  const renderStepContent = () => {
    if (activeStep === 0) {
      return (
        <Grid container spacing={2}>
          {dataTypes.map((type) => (
            <Grid
              size={{ xs: 6, md: 8, lg: 4 }}
              key={type.value}
              component="div"
            >
              <Button
                variant={selectedType === type.value ? "contained" : "outlined"}
                fullWidth
                sx={{
                  height: 60,
                  flexDirection: "column",
                  gap: 1,
                }}
                onClick={() => setSelectedType(type.value)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {type.icon}
                  <Typography variant="body1" color="text.secondary">
                    {type.label}
                  </Typography>
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
      );
    }

    if (activeStep === 1) {
      return (
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              label="عنوان"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </Grid>

          {selectedType === "content" && (
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="محتوای متنی"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
              />
            </Grid>
          )}

          {selectedType === "website" && (
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label="آدرس وب‌سایت"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="https://example.com"
                required
              />
            </Grid>
          )}

          {selectedType === "content_file" && (
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                type="file"
                label="انتخاب فایل"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <UploadIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleFileChange}
                required
              />
              {formData.file && (
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "success.main" }}
                >
                  فایل انتخاب شده: {formData.file.name}
                </Typography>
              )}
            </Grid>
          )}

          {selectedType === "youtube" && (
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label="لینک یوتیوب"
                value={formData.youtubeUrl}
                onChange={(e) =>
                  setFormData({ ...formData, youtubeUrl: e.target.value })
                }
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </Grid>
          )}

          {selectedType === "notion" && (
            <>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  label="توکن نشن"
                  value={formData.notionToken}
                  onChange={(e) =>
                    setFormData({ ...formData, notionToken: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  label="شناسه صفحه نشن"
                  value={formData.notionPageId}
                  onChange={(e) =>
                    setFormData({ ...formData, notionPageId: e.target.value })
                  }
                  required
                />
              </Grid>
            </>
          )}

          {selectedType === "wordpress" && (
            <>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  label="آدرس سایت وردپرس"
                  value={formData.wordpressUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, wordpressUrl: e.target.value })
                  }
                  placeholder="https://example.com"
                  required
                />
              </Grid>
              <Grid size={{ xs: 6, md: 8 }}>
                <TextField
                  fullWidth
                  label="نام کاربری"
                  value={formData.wordpressUsername}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      wordpressUsername: e.target.value,
                    })
                  }
                  required
                />
              </Grid>
              <Grid size={{ xs: 6, md: 8 }}>
                <TextField
                  fullWidth
                  type="password"
                  label="رمز عبور"
                  value={formData.wordpressPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      wordpressPassword: e.target.value,
                    })
                  }
                  required
                />
              </Grid>
            </>
          )}

          {selectedType === "api" && (
            <>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  label="آدرس API"
                  value={formData.apiUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, apiUrl: e.target.value })
                  }
                  placeholder="https://api.example.com/endpoint"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  label="کلید API"
                  value={formData.apiKey}
                  onChange={(e) =>
                    setFormData({ ...formData, apiKey: e.target.value })
                  }
                  required
                />
              </Grid>
            </>
          )}

          {selectedType === "faq" && (
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                multiline
                rows={8}
                label="سوالات و پاسخ‌های متداول"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="سوال: ...&#10;پاسخ: ...&#10;&#10;سوال: ...&#10;پاسخ: ..."
                required
              />
            </Grid>
          )}
        </Grid>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "text.primary" }}>افزودن داده جدید</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, mb: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {renderStepContent()}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>انصراف</Button>
        {activeStep > 0 && <Button onClick={handleBack}>قبلی</Button>}
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={
            (activeStep === 0 && !selectedType) ||
            (activeStep === 1 && !formData.title.trim())
          }
        >
          {activeStep === steps.length - 1 ? "افزودن" : "بعدی"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDataDialog;
