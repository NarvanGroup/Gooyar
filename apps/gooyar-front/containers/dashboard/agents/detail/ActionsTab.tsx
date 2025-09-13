import React, { useState } from "react";
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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
} from "@mui/icons-material";

interface Action {
  id: string;
  name: string;
  type: string;
  description: string;
  isActive: boolean;
  parameters: Record<string, any>;
}

interface ActionsTabProps {
  agentId: string;
}

const ActionsTab: React.FC<ActionsTabProps> = ({ agentId }) => {
  const [actions, setActions] = useState<Action[]>([
    {
      id: "1",
      name: "Send Email",
      type: "email",
      description: "Send automated email responses",
      isActive: true,
      parameters: { template: "default", delay: 0 },
    },
    {
      id: "2",
      name: "Create Ticket",
      type: "ticket",
      description: "Create support tickets automatically",
      isActive: true,
      parameters: { priority: "medium", category: "general" },
    },
    {
      id: "3",
      name: "Database Query",
      type: "database",
      description: "Query customer database",
      isActive: false,
      parameters: { table: "customers", limit: 10 },
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingAction, setEditingAction] = useState<Action | null>(null);
  const [newAction, setNewAction] = useState({
    name: "",
    type: "",
    description: "",
    parameters: {},
  });

  const actionTypes = [
    { value: "email", label: "Email" },
    { value: "ticket", label: "Ticket" },
    { value: "database", label: "Database" },
    { value: "api", label: "API Call" },
    { value: "notification", label: "Notification" },
  ];

  const handleAddAction = () => {
    setEditingAction(null);
    setNewAction({
      name: "",
      type: "",
      description: "",
      parameters: {},
    });
    setOpenDialog(true);
  };

  const handleEditAction = (action: Action) => {
    setEditingAction(action);
    setNewAction({
      name: action.name,
      type: action.type,
      description: action.description,
      parameters: action.parameters,
    });
    setOpenDialog(true);
  };

  const handleDeleteAction = (actionId: string) => {
    setActions(actions.filter((action) => action.id !== actionId));
  };

  const handleToggleAction = (actionId: string) => {
    setActions(
      actions.map((action) =>
        action.id === actionId
          ? { ...action, isActive: !action.isActive }
          : action
      )
    );
  };

  const handleSaveAction = () => {
    if (editingAction) {
      // Update existing action
      setActions(
        actions.map((action) =>
          action.id === editingAction.id ? { ...action, ...newAction } : action
        )
      );
    } else {
      // Add new action
      const newActionWithId = {
        ...newAction,
        id: Date.now().toString(),
        isActive: true,
      };
      setActions([...actions, newActionWithId]);
    }
    setOpenDialog(false);
  };

  const getActionTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      email: "primary",
      ticket: "secondary",
      database: "info",
      api: "warning",
      notification: "success",
    };
    return colors[type] || "default";
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
        {actions.map((action) => (
          <Box key={action.id} sx={{ flex: "1 1 300px", minWidth: 0 }}>
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
                      {action.name}
                    </Typography>
                    <Chip
                      label={action.type}
                      color={getActionTypeColor(action.type) as any}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {action.description}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleAction(action.id)}
                      color={action.isActive ? "success" : "default"}
                    >
                      {action.isActive ? <PlayIcon /> : <StopIcon />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEditAction(action)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteAction(action.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  پارامترها:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {Object.entries(action.parameters).map(([key, value]) => (
                    <Chip
                      key={key}
                      label={`${key}: ${value}`}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Stack>
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
              <TextField
                fullWidth
                label="نام عملیات"
                value={newAction.name}
                onChange={(e) =>
                  setNewAction({ ...newAction, name: e.target.value })
                }
              />
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel>نوع عملیات</InputLabel>
                <Select
                  value={newAction.type}
                  label="نوع عملیات"
                  onChange={(e) =>
                    setNewAction({ ...newAction, type: e.target.value })
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
            <Box>
              <TextField
                fullWidth
                label="توضیحات"
                multiline
                rows={3}
                value={newAction.description}
                onChange={(e) =>
                  setNewAction({ ...newAction, description: e.target.value })
                }
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>انصراف</Button>
          <Button onClick={handleSaveAction} variant="contained">
            {editingAction ? "بروزرسانی" : "افزودن"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActionsTab;
