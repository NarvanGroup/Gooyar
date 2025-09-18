"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
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
  sendTelegramCodeService,
  verifyTelegramCodeService,
} from "@/api/services/contactPointsServices";
import { TelegramModel } from "@/api/services/contactPointsServices/models";

interface TelegramFormData {
  phone_number: string;
  username: string;
  account_name: string;
}

interface VerificationStep {
  step: "phone" | "verification";
  phoneNumber?: string;
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
  const [verificationStep, setVerificationStep] = useState<VerificationStep>({
    step: "phone",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);

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
      setError("بررسی وضعیت اتصال با خطا مواجه شد");
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
    setVerificationStep({ step: "phone" });
    setVerificationCode("");
    setError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
    if (verificationStep.step === "phone") {
      await handleSendCode();
    } else {
      await handleVerifyCode();
    }
  };

  const handleSendCode = async () => {
    if (!formData.phone_number.trim()) {
      setError("شماره تلفن اجباری است");
      return;
    }

    setSendingCode(true);
    setError("");
    try {
      const response = await sendTelegramCodeService(formData.phone_number);
      if (response?.success) {
        // Check if user is already authorized
        if (response?.alreadyAuthorized) {
          // User is already logged in, save account directly
          await saveTelegramAccount();
        } else {
          // User needs verification, show verification step
          setVerificationStep({
            step: "verification",
            phoneNumber: formData.phone_number,
          });
          setSuccess("کد تایید به شماره تلفن شما ارسال شد");
        }
      } else {
        setError(response?.data?.error || "خطا در ارسال کد تایید");
      }
    } catch (error) {
      setError("خطا در ارسال کد تایید");
    } finally {
      setSendingCode(false);
    }
  };

  const saveTelegramAccount = async () => {
    try {
      const accountData: TelegramModel = {
        phone_number: formData.phone_number,
        username: formData.username,
        account_name: formData.account_name,
        is_connected: true,
      };

      if (editingAccount) {
        await updateTelegramAccountService(editingAccount.id!, accountData);
        setSuccess("حساب تلگرام با موفقیت بروزرسانی شد");
      } else {
        await addTelegramAccountService(accountData);
        setSuccess("حساب تلگرام با موفقیت افزوده شد");
      }

      handleCloseDialog();
      fetchTelegramAccounts();
    } catch (error) {
      setError("خطا در ذخیره حساب تلگرام");
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setError("کد تایید اجباری است");
      return;
    }

    setVerifyingCode(true);
    setError("");
    try {
      const response = await verifyTelegramCodeService(verificationCode);
      if (response?.data?.success) {
        // After successful verification, save the account
        await saveTelegramAccount();
      } else {
        setError(response?.data?.error || "کد تایید نامعتبر است");
      }
    } catch (error) {
      setError("خطا در تایید کد");
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا مطمئن هستید که می‌خواهید حساب تلگرام را حذف کنید؟"))
      return;

    setLoading(true);
    try {
      await deleteTelegramAccountService(id);
      setSuccess("حساب تلگرام با موفقیت حذف شد");
      fetchTelegramAccounts();
    } catch (error) {
      setError("بررسی وضعیت اتصال با خطا مواجه شد");
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
        setError("بررسی وضعیت اتصال با خطا مواجه شد");
      }
    } catch (error) {
      setError("بررسی وضعیت اتصال با خطا مواجه شد");
    } finally {
      setQrLoading(false);
    }
  };

  const handleCheckConnection = async (account: TelegramModel) => {
    setConnectionChecking(account.id!);
    try {
      const response = await checkTelegramConnectionService(account.id!);
      if (response?.data?.is_connected) {
        setSuccess("حساب تلگرام با موفقیت اتصال داده شد");
        fetchTelegramAccounts();
      } else {
        setError(
          "حساب تلگرام اتصال ندارد. لطفا QR code را دوباره دریافت کنید."
        );
      }
    } catch (error) {
      setError("بررسی وضعیت اتصال با خطا مواجه شد");
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
        <Typography color="textPrimary" variant="h6">
          حساب های تلگرام
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          افزودن حساب تلگرام
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} pb={3}>
          {telegramAccounts.map((account) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={account.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #e0e0e0",
                  p: 2,
                  borderRadius: 1,
                  width: "100%",
                  minWidth: 300,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography variant="h6" color="textPrimary">
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
                          label="متصل"
                          color="success"
                          size="small"
                        />
                      ) : (
                        <Chip
                          icon={<CancelIcon />}
                          label="متصل نیست"
                          color="error"
                          size="small"
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: "column",
                    alignItems: "flex-end",
                    height: "100%",
                  }}
                >
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
                  </Box>{" "}
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
                        "دریافت QR Code"
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
                      "بررسی وضعیت"
                    )}
                  </Button>
                </Box>
              </Box>
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
        <DialogTitle color="textPrimary">
          {verificationStep.step === "phone"
            ? editingAccount
              ? "ویرایش حساب تلگرام"
              : "افزودن حساب تلگرام"
            : "تایید شماره تلفن"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            {verificationStep.step === "phone" ? (
              <>
                <TextField
                  fullWidth
                  label="شماره تلفن"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                  sx={{ mb: 2 }}
                  placeholder="+1234567890"
                />
                <TextField
                  fullWidth
                  label="نام کاربری (اختیاری)"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  sx={{ mb: 2 }}
                  placeholder="نام کاربری (بدون @)"
                />
                <TextField
                  fullWidth
                  label="نام حساب (اختیاری)"
                  value={formData.account_name}
                  onChange={(e) =>
                    setFormData({ ...formData, account_name: e.target.value })
                  }
                  placeholder="مثال: حساب تلگرام بیزینس"
                />
              </>
            ) : (
              <>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    نکات امنیتی مهم:
                  </Typography>
                  <Typography variant="body2" component="div">
                    • کد تایید را با هیچکس به اشتراک نگذارید
                  </Typography>
                  <Typography variant="body2" component="div">
                    • اطلاعات شما نزد ما امن است
                  </Typography>
                  <Typography variant="body2" component="div">
                    • بهتر است از حساب بیزینس استفاده کنید نه حساب شخصی
                  </Typography>
                </Alert>
                <Typography
                  variant="body2"
                  sx={{ mb: 2, color: "text.secondary" }}
                >
                  کد تایید به شماره {verificationStep.phoneNumber} ارسال شد
                </Typography>
                <TextField
                  fullWidth
                  label="کد تایید"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="کد 5 رقمی دریافتی"
                  inputProps={{ maxLength: 5 }}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>انصراف</Button>
          {verificationStep.step === "verification" && (
            <Button
              onClick={() => setVerificationStep({ step: "phone" })}
              disabled={sendingCode || verifyingCode}
            >
              بازگشت
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={sendingCode || verifyingCode}
          >
            {sendingCode || verifyingCode ? (
              <CircularProgress size={20} />
            ) : verificationStep.step === "phone" ? (
              "ارسال کد تایید"
            ) : (
              "تایید کد"
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
        <DialogTitle>دریافت QR Code تلگرام</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              دریافت این QR code با اپلیکیشن تلگرام خود برای اتصال حساب
            </Typography>
            {qrCode ? (
              <Paper sx={{ p: 2, display: "inline-block" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`data:image/png;base64,${qrCode}`}
                  alt="QR Code تلگرام"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              </Paper>
            ) : (
              <CircularProgress />
            )}
            <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
              پس از دریافت, کلیک کنید "بررسی وضعیت" برای تایید اتصال
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQRDialog}>انصراف</Button>
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
              "بررسی وضعیت"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
