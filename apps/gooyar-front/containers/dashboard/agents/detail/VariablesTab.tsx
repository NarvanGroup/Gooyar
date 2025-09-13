import React, { useState } from "react";
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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
} from "@mui/icons-material";

interface Variable {
  id: string;
  name: string;
  value: string;
  type: string;
  description: string;
  isRequired: boolean;
  isSecret: boolean;
}

interface VariablesTabProps {
  agentId: string;
}

const VariablesTab: React.FC<VariablesTabProps> = ({ agentId }) => {
  const [variables, setVariables] = useState<Variable[]>([
    {
      id: "1",
      name: "API_KEY",
      value: "sk-1234567890abcdef",
      type: "string",
      description: "OpenAI API key for the agent",
      isRequired: true,
      isSecret: true,
    },
    {
      id: "2",
      name: "COMPANY_NAME",
      value: "Gooyar Inc.",
      type: "string",
      description: "Company name for responses",
      isRequired: false,
      isSecret: false,
    },
    {
      id: "3",
      name: "MAX_TOKENS",
      value: "1000",
      type: "number",
      description: "Maximum tokens for responses",
      isRequired: false,
      isSecret: false,
    },
    {
      id: "4",
      name: "TEMPERATURE",
      value: "0.7",
      type: "number",
      description: "AI response temperature",
      isRequired: false,
      isSecret: false,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingVariable, setEditingVariable] = useState<Variable | null>(null);
  const [newVariable, setNewVariable] = useState({
    name: "",
    value: "",
    type: "string",
    description: "",
    isRequired: false,
    isSecret: false,
  });

  const variableTypes = [
    { value: "string", label: "String" },
    { value: "number", label: "Number" },
    { value: "boolean", label: "Boolean" },
    { value: "array", label: "Array" },
    { value: "object", label: "Object" },
  ];

  const handleAddVariable = () => {
    setEditingVariable(null);
    setNewVariable({
      name: "",
      value: "",
      type: "string",
      description: "",
      isRequired: false,
      isSecret: false,
    });
    setOpenDialog(true);
  };

  const handleEditVariable = (variable: Variable) => {
    setEditingVariable(variable);
    setNewVariable({
      name: variable.name,
      value: variable.value,
      type: variable.type,
      description: variable.description,
      isRequired: variable.isRequired,
      isSecret: variable.isSecret,
    });
    setOpenDialog(true);
  };

  const handleDeleteVariable = (variableId: string) => {
    setVariables(variables.filter((variable) => variable.id !== variableId));
  };

  const handleCopyVariable = (variable: Variable) => {
    navigator.clipboard.writeText(`${variable.name}=${variable.value}`);
  };

  const handleSaveVariable = () => {
    if (editingVariable) {
      // Update existing variable
      setVariables(
        variables.map((variable) =>
          variable.id === editingVariable.id
            ? { ...variable, ...newVariable }
            : variable
        )
      );
    } else {
      // Add new variable
      const newVariableWithId = {
        ...newVariable,
        id: Date.now().toString(),
      };
      setVariables([...variables, newVariableWithId]);
    }
    setOpenDialog(false);
  };

  const getVariableTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      string: "primary",
      number: "secondary",
      boolean: "info",
      array: "warning",
      object: "success",
    };
    return colors[type] || "default";
  };

  const getMaskedValue = (value: string, isSecret: boolean) => {
    if (isSecret) {
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
        {variables.map((variable) => (
          <Box key={variable.id} sx={{ flex: "1 1 300px", minWidth: 0 }}>
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
                      {variable.name}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                      <Chip
                        label={variable.type}
                        color={getVariableTypeColor(variable.type) as any}
                        size="small"
                      />
                      {variable.isRequired && (
                        <Chip label="ضروری" color="error" size="small" />
                      )}
                      {variable.isSecret && (
                        <Chip label="محرمانه" color="warning" size="small" />
                      )}
                    </Stack>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {variable.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {getMaskedValue(variable.value, variable.isSecret)}
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
                      onClick={() => handleEditVariable(variable)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteVariable(variable.id)}
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
                label="نام متغیر"
                value={newVariable.name}
                onChange={(e) =>
                  setNewVariable({ ...newVariable, name: e.target.value })
                }
                helperText="از نام‌گذاری UPPER_CASE استفاده کنید"
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
              <FormControl fullWidth>
                <InputLabel>نوع متغیر</InputLabel>
                <Select
                  value={newVariable.type}
                  label="نوع متغیر"
                  onChange={(e) =>
                    setNewVariable({ ...newVariable, type: e.target.value })
                  }
                >
                  {variableTypes.map((type) => (
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
                rows={2}
                value={newVariable.description}
                onChange={(e) =>
                  setNewVariable({
                    ...newVariable,
                    description: e.target.value,
                  })
                }
                helperText="توضیح مختصری از اینکه این متغیر برای چه استفاده می‌شود"
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>ضروری</InputLabel>
                  <Select
                    value={newVariable.isRequired ? "true" : "false"}
                    label="ضروری"
                    onChange={(e) =>
                      setNewVariable({
                        ...newVariable,
                        isRequired: e.target.value === "true",
                      })
                    }
                  >
                    <MenuItem value="true">بله</MenuItem>
                    <MenuItem value="false">خیر</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>محرمانه</InputLabel>
                  <Select
                    value={newVariable.isSecret ? "true" : "false"}
                    label="محرمانه"
                    onChange={(e) =>
                      setNewVariable({
                        ...newVariable,
                        isSecret: e.target.value === "true",
                      })
                    }
                  >
                    <MenuItem value="true">بله</MenuItem>
                    <MenuItem value="false">خیر</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>انصراف</Button>
          <Button onClick={handleSaveVariable} variant="contained">
            {editingVariable ? "بروزرسانی" : "افزودن"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VariablesTab;
