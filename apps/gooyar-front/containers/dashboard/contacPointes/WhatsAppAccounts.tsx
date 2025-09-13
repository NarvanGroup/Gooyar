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
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  QrCode as QrCodeIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import {
  getWhatsAppAccountsService,
  addWhatsAppAccountService,
  updateWhatsAppAccountService,
  deleteWhatsAppAccountService,
  getWhatsAppQRCodeService,
  checkWhatsAppConnectionService,
} from "@/api/services/contactPointsServices";
import { WhatsAppModel } from "@/api/services/contactPointsServices/models";

interface WhatsAppFormData {
  phone_number: string;
  account_name: string;
}

export default function WhatsAppAccounts() {
  const [whatsAppAccounts, setWhatsAppAccounts] = useState<WhatsAppModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [editingAccount, setEditingAccount] = useState<WhatsAppModel | null>(
    null
  );
  const [selectedAccount, setSelectedAccount] = useState<WhatsAppModel | null>(
    null
  );
  const [qrCode, setQrCode] = useState("");
  const [qrLoading, setQrLoading] = useState(false);
  const [connectionChecking, setConnectionChecking] = useState<string | null>(
    null
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<WhatsAppFormData>({
    phone_number: "",
    account_name: "",
  });

  useEffect(() => {
    fetchWhatsAppAccounts();
  }, []);

  const fetchWhatsAppAccounts = async () => {
    setLoading(true);
    try {
      const response = await getWhatsAppAccountsService();
      if (response?.data) {
        setWhatsAppAccounts(response.data);
      }
    } catch (error) {
      setError("Failed to fetch WhatsApp accounts");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (account?: WhatsAppModel) => {
    if (account) {
      setEditingAccount(account);
      setFormData({
        phone_number: account.phone_number,
        account_name: account.account_name || "",
      });
    } else {
      setEditingAccount(null);
      setFormData({
        phone_number: "",
        account_name: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAccount(null);
    setFormData({
      phone_number: "",
      account_name: "",
    });
  };

  const handleSubmit = async () => {
    if (!formData.phone_number.trim()) {
      setError("Phone number is required");
      return;
    }

    setLoading(true);
    try {
      const accountData: WhatsAppModel = {
        phone_number: formData.phone_number,
        account_name: formData.account_name,
        is_connected: false,
      };

      if (editingAccount) {
        await updateWhatsAppAccountService(editingAccount.id!, accountData);
        setSuccess("WhatsApp account updated successfully");
      } else {
        await addWhatsAppAccountService(accountData);
        setSuccess("WhatsApp account added successfully");
      }

      handleCloseDialog();
      fetchWhatsAppAccounts();
    } catch (error) {
      setError("Failed to save WhatsApp account");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this WhatsApp account?"))
      return;

    setLoading(true);
    try {
      await deleteWhatsAppAccountService(id);
      setSuccess("WhatsApp account deleted successfully");
      fetchWhatsAppAccounts();
    } catch (error) {
      setError("Failed to delete WhatsApp account");
    } finally {
      setLoading(false);
    }
  };

  const handleGetQRCode = async (account: WhatsAppModel) => {
    setSelectedAccount(account);
    setQrLoading(true);
    try {
      const response = await getWhatsAppQRCodeService(account.id!);
      if (response?.data?.qr_code) {
        setQrCode(response.data.qr_code);
        setOpenQRDialog(true);
      } else {
        setError("Failed to generate QR code");
      }
    } catch (error) {
      setError("Failed to get QR code");
    } finally {
      setQrLoading(false);
    }
  };

  const handleCheckConnection = async (account: WhatsAppModel) => {
    setConnectionChecking(account.id!);
    try {
      const response = await checkWhatsAppConnectionService(account.id!);
      if (response?.data?.is_connected) {
        setSuccess("WhatsApp account connected successfully");
        fetchWhatsAppAccounts();
      } else {
        setError(
          "WhatsApp account not connected. Please scan the QR code again."
        );
      }
    } catch (error) {
      setError("Failed to check connection status");
    } finally {
      setConnectionChecking(null);
    }
  };

  const handleCloseQRDialog = () => {
    setOpenQRDialog(false);
    setQrCode("");
    setSelectedAccount(null);
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
        <Typography variant="h6">WhatsApp Accounts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add WhatsApp Account
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {whatsAppAccounts.map((account) => (
            <Grid item xs={12} sm={6} md={4} key={account.id}>
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
                        {account.account_name || account.phone_number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {account.phone_number}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {account.is_connected ? (
                          <Chip
                            icon={<CheckCircleIcon />}
                            label="Connected"
                            color="success"
                            size="small"
                          />
                        ) : (
                          <Chip
                            icon={<CancelIcon />}
                            label="Not Connected"
                            color="error"
                            size="small"
                          />
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(account)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(account.id!)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    {!account.is_connected && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<QrCodeIcon />}
                        onClick={() => handleGetQRCode(account)}
                        disabled={qrLoading}
                      >
                        {qrLoading ? (
                          <CircularProgress size={16} />
                        ) : (
                          "Get QR Code"
                        )}
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<RefreshIcon />}
                      onClick={() => handleCheckConnection(account)}
                      disabled={connectionChecking === account.id}
                    >
                      {connectionChecking === account.id ? (
                        <CircularProgress size={16} />
                      ) : (
                        "Check Status"
                      )}
                    </Button>
                  </Box>
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
          {editingAccount ? "Edit WhatsApp Account" : "Add WhatsApp Account"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              sx={{ mb: 2 }}
              placeholder="+1234567890"
            />
            <TextField
              fullWidth
              label="Account Name (Optional)"
              value={formData.account_name}
              onChange={(e) =>
                setFormData({ ...formData, account_name: e.target.value })
              }
              placeholder="e.g., Business WhatsApp"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? (
              <CircularProgress size={20} />
            ) : editingAccount ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog
        open={openQRDialog}
        onClose={handleCloseQRDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Scan WhatsApp QR Code</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Scan this QR code with your WhatsApp mobile app to connect your
              account
            </Typography>
            {qrCode ? (
              <Paper sx={{ p: 2, display: "inline-block" }}>
                <img
                  src={`data:image/png;base64,${qrCode}`}
                  alt="WhatsApp QR Code"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              </Paper>
            ) : (
              <CircularProgress />
            )}
            <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
              After scanning, click "Check Status" to verify the connection
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQRDialog}>Close</Button>
          <Button
            onClick={() =>
              selectedAccount && handleCheckConnection(selectedAccount)
            }
            variant="contained"
            disabled={connectionChecking === selectedAccount?.id}
          >
            {connectionChecking === selectedAccount?.id ? (
              <CircularProgress size={20} />
            ) : (
              "Check Status"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
