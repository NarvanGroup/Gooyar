"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import {
  getPhoneNumbersService,
  addPhoneNumberService,
  updatePhoneNumberService,
  deletePhoneNumberService,
  sendPhoneOTPService,
  verifyPhoneOTPService,
} from "@/api/services/contactPointsServices";
import {
  PhoneNumberModel,
  OTPVerificationModel,
} from "@/api/services/contactPointsServices/models";

interface PhoneNumberFormData {
  phone_number: string;
  country_code: string;
  label: string;
}

const countryCodes = [
  { code: "+1", country: "US/Canada" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+98", country: "Iran" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+39", country: "Italy" },
  { code: "+34", country: "Spain" },
  { code: "+31", country: "Netherlands" },
  { code: "+32", country: "Belgium" },
];

export default function PhoneNumbers() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumberModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openOTPDialog, setOpenOTPDialog] = useState(false);
  const [editingPhone, setEditingPhone] = useState<PhoneNumberModel | null>(
    null
  );
  const [verifyingPhone, setVerifyingPhone] = useState<PhoneNumberModel | null>(
    null
  );
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<PhoneNumberFormData>({
    phone_number: "",
    country_code: "+98",
    label: "Personal",
  });

  useEffect(() => {
    fetchPhoneNumbers();
  }, []);

  const fetchPhoneNumbers = async () => {
    setLoading(true);
    try {
      const response = await getPhoneNumbersService();
      if (response?.data) {
        setPhoneNumbers(response.data);
      }
    } catch (error) {
      setError("Failed to fetch phone numbers");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (phone?: PhoneNumberModel) => {
    if (phone) {
      setEditingPhone(phone);
      setFormData({
        phone_number: phone.phone_number,
        country_code: phone.country_code || "+98",
        label: phone.label || "Personal",
      });
    } else {
      setEditingPhone(null);
      setFormData({
        phone_number: "",
        country_code: "+98",
        label: "Personal",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPhone(null);
    setFormData({
      phone_number: "",
      country_code: "+98",
      label: "Personal",
    });
  };

  const handleSubmit = async () => {
    if (!formData.phone_number.trim()) {
      setError("Phone number is required");
      return;
    }

    setLoading(true);
    try {
      const phoneData: PhoneNumberModel = {
        phone_number: formData.phone_number,
        country_code: formData.country_code,
        label: formData.label,
        is_verified: false,
      };

      if (editingPhone) {
        await updatePhoneNumberService(editingPhone.id!, phoneData);
        setSuccess("Phone number updated successfully");
      } else {
        await addPhoneNumberService(phoneData);
        setSuccess("Phone number added successfully");
      }

      handleCloseDialog();
      fetchPhoneNumbers();
    } catch (error) {
      setError("Failed to save phone number");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this phone number?")) return;

    setLoading(true);
    try {
      await deletePhoneNumberService(id);
      setSuccess("Phone number deleted successfully");
      fetchPhoneNumbers();
    } catch (error) {
      setError("Failed to delete phone number");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (phone: PhoneNumberModel) => {
    setVerifyingPhone(phone);
    setOtpLoading(true);
    try {
      await sendPhoneOTPService(phone.phone_number);
      setOtpSent(true);
      setOpenOTPDialog(true);
      setSuccess("OTP sent successfully");
    } catch (error) {
      setError("Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!verifyingPhone || !otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    setOtpLoading(true);
    try {
      const otpData: OTPVerificationModel = {
        phone_number: verifyingPhone.phone_number,
        otp: otp,
      };

      await verifyPhoneOTPService(otpData);
      setSuccess("Phone number verified successfully");
      setOpenOTPDialog(false);
      setOtp("");
      setOtpSent(false);
      setVerifyingPhone(null);
      fetchPhoneNumbers();
    } catch (error) {
      setError("Invalid OTP. Please try again");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleCloseOTPDialog = () => {
    setOpenOTPDialog(false);
    setOtp("");
    setOtpSent(false);
    setVerifyingPhone(null);
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6">Phone Numbers</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Phone Number
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {phoneNumbers.map((phone) => (
            <Grid item xs={12} sm={6} md={4} key={phone.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">
                        {phone.country_code} {phone.phone_number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {phone.label}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {phone.is_verified ? (
                          <Chip
                            icon={<CheckCircleIcon />}
                            label="Verified"
                            color="success"
                            size="small"
                          />
                        ) : (
                          <Chip
                            icon={<CancelIcon />}
                            label="Not Verified"
                            color="error"
                            size="small"
                          />
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(phone)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(phone.id!)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  {!phone.is_verified && (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleSendOTP(phone)}
                      disabled={otpLoading}
                      sx={{ mt: 1 }}
                    >
                      {otpLoading ? <CircularProgress size={16} /> : "Verify"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingPhone ? "Edit Phone Number" : "Add Phone Number"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Country Code</InputLabel>
              <Select
                value={formData.country_code}
                onChange={(e) =>
                  setFormData({ ...formData, country_code: e.target.value })
                }
                label="Country Code"
              >
                {countryCodes.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.code} ({country.country})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Label (e.g., Personal, Work)"
              value={formData.label}
              onChange={(e) =>
                setFormData({ ...formData, label: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? (
              <CircularProgress size={20} />
            ) : editingPhone ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* OTP Verification Dialog */}
      <Dialog
        open={openOTPDialog}
        onClose={handleCloseOTPDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Verify Phone Number</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Enter the OTP sent to {verifyingPhone?.country_code}{" "}
            {verifyingPhone?.phone_number}
          </Typography>
          <TextField
            fullWidth
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOTPDialog}>Cancel</Button>
          <Button
            onClick={handleVerifyOTP}
            variant="contained"
            disabled={otpLoading}
          >
            {otpLoading ? <CircularProgress size={20} /> : "Verify"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
