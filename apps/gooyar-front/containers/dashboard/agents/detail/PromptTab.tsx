import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";

import CustomFormLabel from "@/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";
import CustomSelect from "@/components/forms/theme-elements/CustomSelect";
import { AgentModel } from "@/api/services/agentsServices/models";

interface PromptTabProps {
  agent: AgentModel;
  onSave: (data: Partial<AgentModel>) => Promise<void>;
  saving: boolean;
}

const PromptTab: React.FC<PromptTabProps> = ({ agent, onSave, saving }) => {
  const [promptData, setPromptData] = useState({
    prompt: agent.prompt || "",
    "custom-greeting": agent["custom-greeting"] || "",
    tone: agent.tone || "friendly",
  });

  const [promptTemplates] = useState([
    "Customer Service Agent",
    "Sales Representative",
    "Technical Support",
    "Personal Assistant",
    "Educational Tutor",
  ]);

  const tones = [
    { value: "friendly", label: "دوستانه" },
    { value: "professional", label: "حرفه‌ای" },
    { value: "casual", label: "غیررسمی" },
    { value: "formal", label: "رسمی" },
  ];

  // Update form data when agent changes
  useEffect(() => {
    setPromptData({
      prompt: agent.prompt || "",
      "custom-greeting": agent["custom-greeting"] || "",
      tone: agent.tone || "friendly",
    });
  }, [agent]);

  const handlePromptChange = (field: string, value: string) => {
    setPromptData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTemplateSelect = (template: string) => {
    // Here you would load the selected template
    console.log("Selected template:", template);
  };

  const handleSave = async () => {
    try {
      await onSave(promptData);
    } catch (error) {
      console.error("Error saving prompt data:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Main Content */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {/* Left Column - Prompt Configuration */}
        <Box sx={{ flex: "1 1 600px", minWidth: 0 }}>
          <>
            <>
              <Typography variant="h6" gutterBottom color="textPrimary">
                تنظیمات پرامپت
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                  <CustomFormLabel htmlFor="tone">لحن عامل</CustomFormLabel>
                  <CustomSelect
                    id="tone"
                    value={promptData.tone}
                    onChange={(e: any) =>
                      handlePromptChange("tone", e.target.value)
                    }
                    fullWidth
                    variant="outlined"
                  >
                    {tones.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Box>

                <Box>
                  <CustomFormLabel htmlFor="custom-greeting">
                    سلام سفارشی
                  </CustomFormLabel>
                  <CustomTextField
                    id="custom-greeting"
                    fullWidth
                    multiline
                    rows={3}
                    value={promptData["custom-greeting"]}
                    onChange={(e: any) =>
                      handlePromptChange("custom-greeting", e.target.value)
                    }
                    placeholder="سلام سفارشی عامل را وارد کنید..."
                    helperText="این پیام در ابتدای هر گفتگو نمایش داده می‌شود"
                  />
                </Box>

                <Box>
                  <CustomFormLabel htmlFor="main-prompt">
                    پرامپت اصلی
                  </CustomFormLabel>
                  <CustomTextField
                    id="main-prompt"
                    fullWidth
                    multiline
                    rows={8}
                    value={promptData.prompt}
                    onChange={(e: any) =>
                      handlePromptChange("prompt", e.target.value)
                    }
                    placeholder="پرامپت اصلی عامل را وارد کنید..."
                    helperText="این پرامپت نقش، شخصیت و رفتار اصلی عامل را تعریف می‌کند"
                  />
                </Box>

                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSave}
                    disabled={saving}
                    startIcon={saving ? <CircularProgress size={20} /> : null}
                  >
                    {saving ? "در حال ذخیره..." : "ذخیره پرامپت"}
                  </Button>
                </Box>
              </Box>
            </>
          </>
        </Box>

        {/* Right Column - Templates and Tips */}
        <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                ml: 3,
                border: "1px solid #e0e0e0",
                p: 3,
              }}
            >
              <Typography variant="body2" color="textSecondary" gutterBottom>
                قالب‌های سریع برای شروع
              </Typography>

              <Stack spacing={1}>
                {promptTemplates.map((template) => (
                  <Chip
                    key={template}
                    label={template}
                    variant="outlined"
                    onClick={() => handleTemplateSelect(template)}
                    sx={{ cursor: "pointer" }}
                  />
                ))}
              </Stack>

              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="textPrimary"
                >
                  نکات پرامپت:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  • در مورد نقش و مسئولیت‌های عامل دقیق باشید
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  • مثال‌هایی از تعاملات مورد انتظار را شامل کنید
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  • لحن و شخصیت را به وضوح تعریف کنید
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  • مرزها و محدودیت‌ها را تعیین کنید
                </Typography>
              </Box>
            </Box>
          </>
        </Box>
      </Box>
    </Box>
  );
};

export default PromptTab;
