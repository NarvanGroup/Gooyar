import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
} from "@mui/icons-material";
import {
  AgentModel,
  AgentVariable,
} from "@/api/services/agentsServices/models";

interface VariablesTabProps {
  agent: AgentModel;
  onSave: (data: Partial<AgentModel>) => Promise<void>;
  saving: boolean;
}

const VariablesTab: React.FC<VariablesTabProps> = ({
  agent,
  onSave,
  saving,
}) => {
  const [variables, setVariables] = useState<AgentVariable[]>(
    agent.variables || []
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [editingVariable, setEditingVariable] = useState<AgentVariable | null>(
    null
  );
  const [newVariable, setNewVariable] = useState<AgentVariable>({
    title: "",
    value: "",
    id: "",
  });

  // Update variables when agent changes
  useEffect(() => {
    setVariables(agent.variables || []);
  }, [agent]);

  const handleAddVariable = () => {
    setEditingVariable(null);
    setNewVariable({
      title: "",
      value: "",
      id: "",
    });
    setOpenDialog(true);
  };

  const handleEditVariable = (variable: AgentVariable, index: number) => {
    setEditingVariable(variable);
    setNewVariable({ ...variable });
    setOpenDialog(true);
  };

  const handleDeleteVariable = (index: number) => {
    const newVariables = variables.filter((_, i) => i !== index);
    setVariables(newVariables);
    handleSaveVariables(newVariables);
  };

  const handleCopyVariable = (variable: AgentVariable) => {
    navigator.clipboard.writeText(`${variable.title}=${variable.value}`);
  };

  const handleSaveVariable = () => {
    let newVariables: AgentVariable[];

    if (editingVariable) {
      // Update existing variable
      const index = variables.findIndex(
        (variable) => variable === editingVariable
      );
      newVariables = [...variables];
      newVariables[index] = {
        ...newVariable,
        id: newVariable.id || Date.now().toString(),
      };
    } else {
      // Add new variable
      const newVariableWithId = {
        ...newVariable,
        id: newVariable.id || Date.now().toString(),
      };
      newVariables = [...variables, newVariableWithId];
    }

    setVariables(newVariables);
    setOpenDialog(false);
    handleSaveVariables(newVariables);
  };

  const handleSaveVariables = async (variablesToSave: AgentVariable[]) => {
    try {
      await onSave({ variables: variablesToSave });
    } catch (error) {
      console.error("Error saving variables:", error);
    }
  };

  const getMaskedValue = (value: string) => {
    // Simple masking for sensitive values
    if (
      value.toLowerCase().includes("key") ||
      value.toLowerCase().includes("secret") ||
      value.toLowerCase().includes("password")
    ) {
      return "*".repeat(Math.min(value.length, 8));
    }
    return value;
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">متغیرهای عامل</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddVariable}
        >
          افزودن متغیر
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        متغیرها برای ذخیره مقادیر پیکربندی و اسرار استفاده می‌شوند که عامل شما
        می‌تواند در طول گفتگوها به آنها دسترسی داشته باشد.
      </Alert>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {variables.map((variable, index) => (
          <Box
            key={variable.id || index}
            sx={{ flex: "1 1 300px", minWidth: 0 }}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {variable.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      ID: {variable.id}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {getMaskedValue(variable.value)}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleCopyVariable(variable)}
                      title="کپی متغیر"
                    >
                      <CopyIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEditVariable(variable, index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteVariable(index)}
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

      {/* Add/Edit Variable Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingVariable ? "ویرایش متغیر" : "افزودن متغیر جدید"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <Box>
              <TextField
                fullWidth
                label="عنوان متغیر"
                value={newVariable.title}
                onChange={(e) =>
                  setNewVariable({ ...newVariable, title: e.target.value })
                }
                helperText="نام متغیر را وارد کنید"
                required
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="مقدار متغیر"
                value={newVariable.value}
                onChange={(e) =>
                  setNewVariable({ ...newVariable, value: e.target.value })
                }
                required
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="شناسه متغیر"
                value={newVariable.id}
                onChange={(e) =>
                  setNewVariable({ ...newVariable, id: e.target.value })
                }
                helperText="شناسه یکتا برای متغیر (اختیاری)"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={saving}>
            انصراف
          </Button>
          <Button
            onClick={handleSaveVariable}
            variant="contained"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} /> : null}
          >
            {editingVariable ? "بروزرسانی" : "افزودن"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VariablesTab;
