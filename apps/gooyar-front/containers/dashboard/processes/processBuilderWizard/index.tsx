"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
  Alert,
  Tooltip,
  Switch,
  FormGroup,
  InputAdornment,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon,
  Add as AddIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Telegram as TelegramIcon,
  Email as EmailIcon,
  Book as BookIcon,
  CalendarToday as CalendarIcon,
  SmartToy as SmartToyIcon,
  Psychology as PsychologyIcon,
  Settings as SettingsIcon,
  Upload as UploadIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  PlayArrow as PlayArrowIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ArrowForward,
} from "@mui/icons-material";
import AddAgentDialog from "../../agents/components/AddAgentDialog";
import { useRouter } from "next/navigation";

// Types
interface Agent {
  id: string;
  name: string;
  description: string;
}

interface ContactPoint {
  id: string;
  type: "phone" | "whatsapp" | "telegram" | "email";
  value: string;
  name?: string;
}

interface KnowledgeBase {
  id: string;
  name: string;
  size: string;
  type?: string;
}

interface Calendar {
  id: string;
  provider: string;
  connected: boolean;
  name?: string;
}

interface ProcessData {
  agentId: string;
  contactPointIds: string[];
  knowledgeBaseIds: string[];
  calendarId: string | null;
  aiConfig: {
    promptTemplate: string;
    tone: "friendly" | "formal" | "casual";
    maxTokens: number;
  };
}

interface ProcessBuilderWizardProps {
  agents: Agent[];
  contactPoints: ContactPoint[];
  knowledgeBases: KnowledgeBase[];
  calendars: Calendar[];
  onComplete: (data: ProcessData) => void;
  onCancel: () => void;
}

const steps = [
  "انتخاب عامل",
  "نقاط تماس",
  "پایگاه دانش",
  "تقویم",
  "تنظیمات هوش مصنوعی",
];

const ProcessBuilderWizard: React.FC<ProcessBuilderWizardProps> = ({
  agents,
  contactPoints,
  knowledgeBases,
  calendars,
  onComplete,
  onCancel,
}) => {
  const router = useRouter();
  // State
  const [activeStep, setActiveStep] = useState(0);
  const [processData, setProcessData] = useState<ProcessData>({
    agentId: "",
    contactPointIds: [],
    knowledgeBaseIds: [],
    calendarId: null,
    aiConfig: {
      promptTemplate: "",
      tone: "friendly",
      maxTokens: 1000,
    },
  });

  // Step-specific states
  const [showCreateAgent, setShowCreateAgent] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: "", description: "" });
  const [showAddContactPoint, setShowAddContactPoint] = useState(false);
  const [newContactPoint, setNewContactPoint] = useState({
    type: "phone" as ContactPoint["type"],
    value: "",
    name: "",
  });
  const [showUploadKB, setShowUploadKB] = useState(false);
  const [newKB, setNewKB] = useState({ name: "", file: null as File | null });
  const [enableBooking, setEnableBooking] = useState(false);
  const [isTestingAI, setIsTestingAI] = useState(false);

  // Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Helper functions
  const getContactPointIcon = (type: ContactPoint["type"]) => {
    switch (type) {
      case "phone":
        return <PhoneIcon />;
      case "whatsapp":
        return <WhatsAppIcon />;
      case "telegram":
        return <TelegramIcon />;
      case "email":
        return <EmailIcon />;
      default:
        return <PhoneIcon />;
    }
  };

  const getContactPointColor = (type: ContactPoint["type"]) => {
    switch (type) {
      case "phone":
        return "primary";
      case "whatsapp":
        return "success";
      case "telegram":
        return "info";
      case "email":
        return "warning";
      default:
        return "default";
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!processData.agentId) {
          newErrors.agentId = "لطفاً یک عامل انتخاب کنید";
        }
        break;
      case 1:
        if (processData.contactPointIds.length === 0) {
          newErrors.contactPoints = "حداقل یک نقطه تماس انتخاب کنید";
        }
        break;
      case 2:
        if (processData.knowledgeBaseIds.length === 0) {
          newErrors.knowledgeBases = "حداقل یک پایگاه دانش انتخاب کنید";
        }
        break;
      case 4:
        if (!processData.aiConfig.promptTemplate.trim()) {
          newErrors.promptTemplate = "قالب پیام الزامی است";
        }
        if (processData.aiConfig.maxTokens < 100) {
          newErrors.maxTokens = "حداقل ۱۰۰ توکن الزامی است";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleFinish = () => {
    if (validateStep(activeStep)) {
      onComplete(processData);
    }
  };

  const handleCreateAgent = () => {
    if (newAgent.name.trim() && newAgent.description.trim()) {
      const agent: Agent = {
        id: `agent-${Date.now()}`,
        name: newAgent.name,
        description: newAgent.description,
      };
      setProcessData({ ...processData, agentId: agent.id });
      setShowCreateAgent(false);
      setNewAgent({ name: "", description: "" });
    }
  };

  const handleAddContactPoint = () => {
    if (newContactPoint.value.trim() && newContactPoint.name.trim()) {
      const contactPoint: ContactPoint = {
        id: `cp-${Date.now()}`,
        type: newContactPoint.type,
        value: newContactPoint.value,
        name: newContactPoint.name,
      };
      setProcessData({
        ...processData,
        contactPointIds: [...processData.contactPointIds, contactPoint.id],
      });
      setShowAddContactPoint(false);
      setNewContactPoint({ type: "phone", value: "", name: "" });
    }
  };

  const handleUploadKB = () => {
    if (newKB.name.trim() && newKB.file) {
      const kb: KnowledgeBase = {
        id: `kb-${Date.now()}`,
        name: newKB.name,
        size: `${(newKB.file.size / 1024 / 1024).toFixed(2)} MB`,
      };
      setProcessData({
        ...processData,
        knowledgeBaseIds: [...processData.knowledgeBaseIds, kb.id],
      });
      setShowUploadKB(false);
      setNewKB({ name: "", file: null });
    }
  };

  const handleTestAI = async () => {
    setIsTestingAI(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsTestingAI(false);
    // Show success message or handle response
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <>
              <Typography variant="h6" gutterBottom>
                عامل هوش مصنوعی را انتخاب کنید
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                عاملی که می‌خواهید برای این فرآیند استفاده کنید را انتخاب کنید
              </Typography>

              <FormControl fullWidth error={!!errors.agentId}>
                <InputLabel>انتخاب عامل</InputLabel>
                <Select
                  value={processData.agentId}
                  onChange={(e) =>
                    setProcessData({ ...processData, agentId: e.target.value })
                  }
                  label="انتخاب عامل"
                >
                  {agents.map((agent) => (
                    <MenuItem key={agent.id} value={agent.id}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <SmartToyIcon />
                        <Box>
                          <Typography variant="body1">{agent.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {agent.description}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {errors.agentId && (
                  <Typography variant="caption" color="error">
                    {errors.agentId}
                  </Typography>
                )}
              </FormControl>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setShowCreateAgent(true)}
                >
                  ایجاد عامل جدید
                </Button>
              </Box>
            </>
          </>
        );

      case 1:
        return (
          <>
            <>
              <Typography variant="h6" gutterBottom>
                نقاط تماس را انتخاب کنید
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                نقاط تماسی که کاربران می‌توانند از طریق آن‌ها با شما ارتباط
                برقرار کنند
              </Typography>

              <Grid container spacing={2}>
                {contactPoints.map((cp) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={cp.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={processData.contactPointIds.includes(cp.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProcessData({
                                ...processData,
                                contactPointIds: [
                                  ...processData.contactPointIds,
                                  cp.id,
                                ],
                              });
                            } else {
                              setProcessData({
                                ...processData,
                                contactPointIds:
                                  processData.contactPointIds.filter(
                                    (id) => id !== cp.id
                                  ),
                              });
                            }
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {getContactPointIcon(cp.type)}
                          <Box>
                            <Typography variant="body2">
                              {cp.name || cp.value}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {cp.value}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </Grid>
                ))}
              </Grid>

              {errors.contactPoints && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errors.contactPoints}
                </Alert>
              )}

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => router.push("/dashboard/contact-points")}
                >
                  افزودن نقطه تماس جدید
                </Button>
              </Box>
            </>
          </>
        );

      case 2:
        return (
          <>
            <>
              <Typography variant="h6" gutterBottom>
                پایگاه‌های دانش را انتخاب کنید
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                پایگاه‌های دانشی که عامل می‌تواند از آن‌ها استفاده کند
              </Typography>

              <Grid container spacing={2}>
                {knowledgeBases.map((kb) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={kb.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={processData.knowledgeBaseIds.includes(kb.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProcessData({
                                ...processData,
                                knowledgeBaseIds: [
                                  ...processData.knowledgeBaseIds,
                                  kb.id,
                                ],
                              });
                            } else {
                              setProcessData({
                                ...processData,
                                knowledgeBaseIds:
                                  processData.knowledgeBaseIds.filter(
                                    (id) => id !== kb.id
                                  ),
                              });
                            }
                          }}
                        />
                      }
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <BookIcon />
                          <Box>
                            <Typography variant="body2">{kb.name}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {kb.size}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </Grid>
                ))}
              </Grid>

              {errors.knowledgeBases && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errors.knowledgeBases}
                </Alert>
              )}

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<UploadIcon />}
                  onClick={() => router.push("/dashboard/knowledge-bases")}
                >
                  آپلود پایگاه دانش جدید
                </Button>
              </Box>
            </>
          </>
        );

      case 3:
        return (
          <>
            <>
              <Typography variant="h6" gutterBottom>
                اتصال تقویم (اختیاری)
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                برای فعال‌سازی قابلیت رزرو وقت، تقویم خود را متصل کنید
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={enableBooking}
                    onChange={(e) => setEnableBooking(e.target.checked)}
                  />
                }
                label="فعال‌سازی قابلیت رزرو وقت"
              />

              {enableBooking && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    تقویم‌های متصل شده:
                  </Typography>
                  <List>
                    {calendars.map((calendar) => (
                      <ListItem key={calendar.id}>
                        <ListItemIcon>
                          <CalendarIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={calendar.name || calendar.provider}
                          secondary={calendar.connected ? "متصل" : "غیر متصل"}
                        />
                        <ListItemSecondaryAction>
                          {calendar.connected ? (
                            <Chip
                              label="متصل"
                              color="success"
                              size="small"
                              onClick={() =>
                                setProcessData({
                                  ...processData,
                                  calendarId: calendar.id,
                                })
                              }
                            />
                          ) : (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                setProcessData({
                                  ...processData,
                                  calendarId: calendar.id,
                                })
                              }
                            >
                              اتصال
                            </Button>
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </>
          </>
        );

      case 4:
        return (
          <>
            <>
              <Typography variant="h6" gutterBottom color="text.primary">
                از درستی تنظیمات خود اطمینان دارید؟
              </Typography>

              {/* Summary Card */}
              <Box
                sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h6" color="textSecondary">
                    عامل انتخاب شده:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {agents.find((a) => a.id === processData.agentId)?.name ||
                      "انتخاب نشده"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h6" color="textSecondary">
                    نقاط تماس:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {processData.contactPointIds.length} مورد انتخاب شده
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h6" color="textSecondary">
                    پایگاه‌های دانش:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {processData.knowledgeBaseIds.length} مورد انتخاب شده
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h6" color="textSecondary">
                    تقویم:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {processData.calendarId ? "متصل" : "متصل نشده"}
                  </Typography>
                </Box>
              </Box>
            </>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="textSecondary">
          فرآیند هوش مصنوعی خود را در ۵ مرحله ساده ایجاد کنید
        </Typography>
      </Box>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={((activeStep + 1) / steps.length) * 100}
        sx={{ mb: 3 }}
      />

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowForward />}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          قبلی
        </Button>

        <Box sx={{ display: "flex", gap: 2 }}>
          {activeStep === steps.length - 1 && (
            <>
              <Button
                variant="outlined"
                startIcon={<PlayArrowIcon />}
                onClick={handleTestAI}
                disabled={isTestingAI}
              >
                {isTestingAI ? "در حال تست..." : "تست هوش مصنوعی"}
              </Button>
              {isTestingAI && <LinearProgress sx={{ flexGrow: 1 }} />}{" "}
            </>
          )}
          <Button variant="outlined" onClick={onCancel}>
            انصراف
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={handleFinish}
            >
              ایجاد فرآیند
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<ArrowBackIcon />}
              onClick={handleNext}
            >
              بعدی
            </Button>
          )}
        </Box>
      </Box>

      {/* Create Agent Dialog */}
      <AddAgentDialog
        showCreateAgent={showCreateAgent}
        setShowCreateAgent={setShowCreateAgent}
        newAgent={newAgent}
        setNewAgent={setNewAgent}
        handleCreateAgent={handleCreateAgent}
      />
    </Box>
  );
};

export default ProcessBuilderWizard;
