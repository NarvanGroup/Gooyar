import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
} from "@mui/icons-material";
import { AgentModel, AgentAction } from "@/api/services/agentsServices/models";

interface ActionsTabProps {
  agent: AgentModel;
  onSave: (data: Partial<AgentModel>) => Promise<void>;
  saving: boolean;
}

const ActionsTab: React.FC<ActionsTabProps> = ({ agent, onSave, saving }) => {
  const [actions, setActions] = useState<AgentAction[]>(agent.actions || []);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAction, setEditingAction] = useState<AgentAction | null>(null);
  const [newAction, setNewAction] = useState<AgentAction>({
    type: "send-email",
    url: "",
    "notification-type": "",
  });

  // Update actions when agent changes
  useEffect(() => {
    setActions(agent.actions || []);
  }, [agent]);

  const actionTypes = [
    { value: "send-sms", label: "ارسال پیامک" },
    { value: "webhook", label: "Webhook" },
    { value: "schedule", label: "زمان‌بندی" },
    { value: "send-email", label: "ارسال ایمیل" },
    { value: "send-notification", label: "ارسال اعلان" },
    { value: "end-convo", label: "پایان گفتگو" },
  ];

  const notificationTypes = [
    { value: "push", label: "Push Notification" },
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "in-app", label: "In-App" },
  ];

  const handleAddAction = () => {
    setEditingAction(null);
    setNewAction({
      type: "send-email",
      url: "",
      "notification-type": "",
    });
    setOpenDialog(true);
  };

  const handleEditAction = (action: AgentAction, index: number) => {
    setEditingAction(action);
    setNewAction({ ...action });
    setOpenDialog(true);
  };

  const handleDeleteAction = (index: number) => {
    const newActions = actions.filter((_, i) => i !== index);
    setActions(newActions);
    handleSaveActions(newActions);
  };

  const handleSaveAction = () => {
    let newActions: AgentAction[];

    if (editingAction) {
      // Update existing action
      const index = actions.findIndex((action) => action === editingAction);
      newActions = [...actions];
      newActions[index] = newAction;
    } else {
      // Add new action
      newActions = [...actions, newAction];
    }

    setActions(newActions);
    setOpenDialog(false);
    handleSaveActions(newActions);
  };

  const handleSaveActions = async (actionsToSave: AgentAction[]) => {
    try {
      await onSave({ actions: actionsToSave });
    } catch (error) {
      console.error("Error saving actions:", error);
    }
  };

  const getActionTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "send-sms": "primary",
      webhook: "secondary",
      schedule: "info",
      "send-email": "warning",
      "send-notification": "success",
      "end-convo": "error",
    };
    return colors[type] || "default";
  };

  const getActionTypeLabel = (type: string) => {
    const typeObj = actionTypes.find((t) => t.value === type);
    return typeObj ? typeObj.label : type;
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h6" color="textPrimary">
            عملیات عامل
          </Typography>
          <Typography variant="body2" color="textSecondary">
            میتوانید عملیات های مختلفی را برای عامل خود اضافه کنید و آنها را به
            صورت مجزا اجرا کنید. این عملیات ها به صورت اتوماتیک پس از پایان
            گفتگو اجرا میشوند.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddAction}
        >
          افزودن عملیات
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {actions.map((action, index) => (
          <Box key={index} sx={{ flex: "1 1 300px", minWidth: 0 }}>
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
                    <Typography variant="h6" gutterBottom>
                      {getActionTypeLabel(action.type)}
                    </Typography>
                    <Chip
                      label={getActionTypeLabel(action.type)}
                      color={getActionTypeColor(action.type) as any}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    {action.url && (
                      <Typography variant="body2" color="textSecondary">
                        URL: {action.url}
                      </Typography>
                    )}
                    {action["notification-type"] && (
                      <Typography variant="body2" color="textSecondary">
                        نوع اعلان: {action["notification-type"]}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEditAction(action, index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteAction(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Add/Edit Action Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingAction ? "ویرایش عملیات" : "افزودن عملیات جدید"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <Box>
              <FormControl fullWidth>
                <InputLabel>نوع عملیات</InputLabel>
                <Select
                  value={newAction.type}
                  label="نوع عملیات"
                  onChange={(e) =>
                    setNewAction({ ...newAction, type: e.target.value as any })
                  }
                >
                  {actionTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {(newAction.type === "webhook" ||
              newAction.type === "send-email") && (
              <Box>
                <TextField
                  fullWidth
                  label="URL"
                  value={newAction.url || ""}
                  onChange={(e) =>
                    setNewAction({ ...newAction, url: e.target.value })
                  }
                  placeholder="آدرس URL را وارد کنید..."
                />
              </Box>
            )}
            {newAction.type === "send-notification" && (
              <Box>
                <FormControl fullWidth>
                  <InputLabel>نوع اعلان</InputLabel>
                  <Select
                    value={newAction["notification-type"] || ""}
                    label="نوع اعلان"
                    onChange={(e) =>
                      setNewAction({
                        ...newAction,
                        "notification-type": e.target.value,
                      })
                    }
                  >
                    {notificationTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={saving}>
            انصراف
          </Button>
          <Button
            onClick={handleSaveAction}
            variant="contained"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} /> : null}
          >
            {editingAction ? "بروزرسانی" : "افزودن"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActionsTab;
