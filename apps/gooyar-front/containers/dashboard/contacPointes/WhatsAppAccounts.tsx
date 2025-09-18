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
  getWhatsAppAccountsService,
  addWhatsAppAccountService,
  updateWhatsAppAccountService,
  deleteWhatsAppAccountService,
  getWhatsAppQRCodeService,
  checkWhatsAppConnectionService,
  sendWhatsAppCodeService,
  verifyWhatsAppCodeService,
} from "@/api/services/contactPointsServices";
import { WhatsAppModel } from "@/api/services/contactPointsServices/models";

interface WhatsAppFormData {
  phone_number: string;
  account_name: string;
}

interface VerificationStep {
  step: "phone" | "verification";
  phoneNumber?: string;
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
  const [verificationStep, setVerificationStep] = useState<VerificationStep>({
    step: "phone",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);

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
      const response = await sendWhatsAppCodeService(formData.phone_number);
      if (response?.success) {
        // Check if user is already authorized
        if (response?.alreadyAuthorized) {
          // User is already logged in, save account directly
          await saveWhatsAppAccount();
        } else {
          // User needs verification, show verification step
          setVerificationStep({
            step: "verification",
            phoneNumber: formData.phone_number,
          });
          setSuccess("کد تایید به شماره تلفن شما ارسال شد");
        }
      } else {
        setError(response?.error || "خطا در ارسال کد تایید");
      }
    } catch (error) {
      setError("خطا در ارسال کد تایید");
    } finally {
      setSendingCode(false);
    }
  };

  const saveWhatsAppAccount = async () => {
    try {
      const accountData: WhatsAppModel = {
        phone_number: formData.phone_number,
        account_name: formData.account_name,
        is_connected: true,
      };

      if (editingAccount) {
        await updateWhatsAppAccountService(editingAccount.id!, accountData);
        setSuccess("حساب واتساپ با موفقیت بروزرسانی شد");
      } else {
        await addWhatsAppAccountService(accountData);
        setSuccess("حساب واتساپ با موفقیت افزوده شد");
      }

      handleCloseDialog();
      fetchWhatsAppAccounts();
    } catch (error) {
      setError("خطا در ذخیره حساب واتساپ");
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
      const response = await verifyWhatsAppCodeService(
        formData.phone_number,
        verificationCode
      );
      if (response?.success) {
        // After successful verification, save the account
        await saveWhatsAppAccount();
      } else {
        setError(response?.error || "کد تایید نامعتبر است");
      }
    } catch (error) {
      setError("خطا در تایید کد");
    } finally {
      setVerifyingCode(false);
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
        setSuccess("حساب واتساپ با موفقیت اتصال داده شد");
        fetchWhatsAppAccounts();
      } else {
        setError(
          "حساب واتساپ اتصال ندارد. لطفا QR code را دوباره دریافت کنید."
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
          حساب های واتساپ
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          افزودن حساب واتساپ
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} pb={3}>
          {whatsAppAccounts.map((account) => (
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
                      {account.account_name || account.phone_number}
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
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
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
              ? "ویرایش حساب واتساپ"
              : "افزودن حساب واتساپ"
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
                  label="نام حساب (اختیاری)"
                  value={formData.account_name}
                  onChange={(e) =>
                    setFormData({ ...formData, account_name: e.target.value })
                  }
                  placeholder="مثال: حساب واتساپ بیزینس"
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
                  placeholder="کد 6 رقمی دریافتی"
                  inputProps={{ maxLength: 6 }}
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
        <DialogTitle>دریافت QR Code واتساپ</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              دریافت این QR code با اپلیکیشن واتساپ خود برای اتصال حساب
            </Typography>
            {qrCode ? (
              <Paper sx={{ p: 2, display: "inline-block" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`data:image/png;base64,${qrCode}`}
                  alt="QR Code واتساپ"
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
