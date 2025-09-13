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
  getTelegramAccountsService,
  addTelegramAccountService,
  updateTelegramAccountService,
  deleteTelegramAccountService,
  getTelegramQRCodeService,
  checkTelegramConnectionService,
} from "@/api/services/contactPointsServices";
import { TelegramModel } from "@/api/services/contactPointsServices/models";

interface TelegramFormData {
  phone_number: string;
  username: string;
  account_name: string;
}

export default function TelegramAccounts() {
  const [telegramAccounts, setTelegramAccounts] = useState<TelegramModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [editingAccount, setEditingAccount] = useState<TelegramModel | null>(
    null
  );
  const [selectedAccount, setSelectedAccount] = useState<TelegramModel | null>(
    null
  );
  const [qrCode, setQrCode] = useState("");
  const [qrLoading, setQrLoading] = useState(false);
  const [connectionChecking, setConnectionChecking] = useState<string | null>(
    null
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<TelegramFormData>({
    phone_number: "",
    username: "",
    account_name: "",
  });

  useEffect(() => {
    fetchTelegramAccounts();
  }, []);

  const fetchTelegramAccounts = async () => {
    setLoading(true);
    try {
      const response = await getTelegramAccountsService();
      if (response?.data) {
        setTelegramAccounts(response.data);
      }
    } catch (error) {
      setError("Failed to fetch Telegram accounts");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (account?: TelegramModel) => {
    if (account) {
      setEditingAccount(account);
      setFormData({
        phone_number: account.phone_number,
        username: account.username || "",
        account_name: account.account_name || "",
      });
    } else {
      setEditingAccount(null);
      setFormData({
        phone_number: "",
        username: "",
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
      username: "",
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
      const accountData: TelegramModel = {
        phone_number: formData.phone_number,
        username: formData.username,
        account_name: formData.account_name,
        is_connected: false,
      };

      if (editingAccount) {
        await updateTelegramAccountService(editingAccount.id!, accountData);
        setSuccess("Telegram account updated successfully");
      } else {
        await addTelegramAccountService(accountData);
        setSuccess("Telegram account added successfully");
      }

      handleCloseDialog();
      fetchTelegramAccounts();
    } catch (error) {
      setError("Failed to save Telegram account");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Telegram account?"))
      return;

    setLoading(true);
    try {
      await deleteTelegramAccountService(id);
      setSuccess("Telegram account deleted successfully");
      fetchTelegramAccounts();
    } catch (error) {
      setError("Failed to delete Telegram account");
    } finally {
      setLoading(false);
    }
  };

  const handleGetQRCode = async (account: TelegramModel) => {
    setSelectedAccount(account);
    setQrLoading(true);
    try {
      const response = await getTelegramQRCodeService(account.id!);
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

  const handleCheckConnection = async (account: TelegramModel) => {
    setConnectionChecking(account.id!);
    try {
      const response = await checkTelegramConnectionService(account.id!);
      if (response?.data?.is_connected) {
        setSuccess("Telegram account connected successfully");
        fetchTelegramAccounts();
      } else {
        setError(
          "Telegram account not connected. Please scan the QR code again."
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
        <Typography variant="h6">Telegram Accounts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Telegram Account
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {telegramAccounts.map((account) => (
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
                        {account.account_name ||
                          account.username ||
                          account.phone_number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {account.username && `@${account.username}`}
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
          {editingAccount ? "Edit Telegram Account" : "Add Telegram Account"}
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
              label="Username (Optional)"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              sx={{ mb: 2 }}
              placeholder="username (without @)"
            />
            <TextField
              fullWidth
              label="Account Name (Optional)"
              value={formData.account_name}
              onChange={(e) =>
                setFormData({ ...formData, account_name: e.target.value })
              }
              placeholder="e.g., Business Telegram"
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
        <DialogTitle>Scan Telegram QR Code</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Scan this QR code with your Telegram mobile app to connect your
              account
            </Typography>
            {qrCode ? (
              <Paper sx={{ p: 2, display: "inline-block" }}>
                <img
                  src={`data:image/png;base64,${qrCode}`}
                  alt="Telegram QR Code"
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
