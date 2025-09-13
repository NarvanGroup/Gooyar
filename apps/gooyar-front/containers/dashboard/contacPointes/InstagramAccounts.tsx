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
  Link,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";
import {
  getInstagramAccountsService,
  addInstagramAccountService,
  updateInstagramAccountService,
  deleteInstagramAccountService,
  checkInstagramConnectionService,
} from "@/api/services/contactPointsServices";
import { InstagramModel } from "@/api/services/contactPointsServices/models";

interface InstagramFormData {
  username: string;
  account_name: string;
}

export default function InstagramAccounts() {
  const [instagramAccounts, setInstagramAccounts] = useState<InstagramModel[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAccount, setEditingAccount] = useState<InstagramModel | null>(
    null
  );
  const [connectionChecking, setConnectionChecking] = useState<string | null>(
    null
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<InstagramFormData>({
    username: "",
    account_name: "",
  });

  useEffect(() => {
    fetchInstagramAccounts();
  }, []);

  const fetchInstagramAccounts = async () => {
    setLoading(true);
    try {
      const response = await getInstagramAccountsService();
      if (response?.data) {
        setInstagramAccounts(response.data);
      }
    } catch (error) {
      setError("Failed to fetch Instagram accounts");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (account?: InstagramModel) => {
    if (account) {
      setEditingAccount(account);
      setFormData({
        username: account.username,
        account_name: account.account_name || "",
      });
    } else {
      setEditingAccount(null);
      setFormData({
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
      username: "",
      account_name: "",
    });
  };

  const handleSubmit = async () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return;
    }

    setLoading(true);
    try {
      const accountData: InstagramModel = {
        username: formData.username,
        account_name: formData.account_name,
        is_connected: false,
      };

      if (editingAccount) {
        await updateInstagramAccountService(editingAccount.id!, accountData);
        setSuccess("Instagram account updated successfully");
      } else {
        await addInstagramAccountService(accountData);
        setSuccess("Instagram account added successfully");
      }

      handleCloseDialog();
      fetchInstagramAccounts();
    } catch (error) {
      setError("Failed to save Instagram account");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Instagram account?"))
      return;

    setLoading(true);
    try {
      await deleteInstagramAccountService(id);
      setSuccess("Instagram account deleted successfully");
      fetchInstagramAccounts();
    } catch (error) {
      setError("Failed to delete Instagram account");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckConnection = async (account: InstagramModel) => {
    setConnectionChecking(account.id!);
    try {
      const response = await checkInstagramConnectionService(account.id!);
      if (response?.data?.is_connected) {
        setSuccess("Instagram account connected successfully");
        fetchInstagramAccounts();
      } else {
        setError("Instagram account not connected. Please authorize the app.");
      }
    } catch (error) {
      setError("Failed to check connection status");
    } finally {
      setConnectionChecking(null);
    }
  };

  const handleAuthorizeInstagram = (account: InstagramModel) => {
    // This would typically redirect to Instagram OAuth
    // For now, we'll show a message about the process
    const authUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/instagram?account_id=${account.id}`;
    window.open(authUrl, "_blank");
    setSuccess("Redirecting to Instagram authorization...");
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
        <Typography variant="h6">Instagram Accounts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Instagram Account
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {instagramAccounts.map((account) => (
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
                        {account.account_name || `@${account.username}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        @{account.username}
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
                  <Box
                    sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    {!account.is_connected && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<LaunchIcon />}
                        onClick={() => handleAuthorizeInstagram(account)}
                      >
                        Authorize
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
          {editingAccount ? "Edit Instagram Account" : "Add Instagram Account"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              sx={{ mb: 2 }}
              placeholder="username (without @)"
              helperText="Enter your Instagram username without the @ symbol"
            />
            <TextField
              fullWidth
              label="Account Name (Optional)"
              value={formData.account_name}
              onChange={(e) =>
                setFormData({ ...formData, account_name: e.target.value })
              }
              placeholder="e.g., Business Instagram"
            />
            <Alert severity="info" sx={{ mt: 2 }}>
              After adding the account, you'll need to authorize it with
              Instagram to enable messaging.
            </Alert>
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
    </Box>
  );
}
