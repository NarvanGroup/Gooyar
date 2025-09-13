import React, { useState } from "react";
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
} from "@mui/material";

import CustomFormLabel from "@/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";
import CustomSelect from "@/components/forms/theme-elements/CustomSelect";

interface PromptTabProps {
  agentId: string;
}

const PromptTab: React.FC<PromptTabProps> = ({ agentId }) => {
  const [promptData, setPromptData] = useState({
    systemPrompt: "",
    userPrompt: "",
    contextPrompt: "",
    promptType: "general",
  });

  const [promptTemplates] = useState([
    "Customer Service Agent",
    "Sales Representative",
    "Technical Support",
    "Personal Assistant",
    "Educational Tutor",
  ]);

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

  const handleSave = () => {
    console.log("Saving prompt data:", promptData);
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
                  <CustomFormLabel htmlFor="prompt-type">
                    نوع پرامپت
                  </CustomFormLabel>
                  <CustomSelect
                    id="prompt-type"
                    value={promptData.promptType}
                    onChange={(e) =>
                      handlePromptChange("promptType", e.target.value)
                    }
                    fullWidth
                    variant="outlined"
                  >
                    <MenuItem value="general">عمومی</MenuItem>
                    <MenuItem value="customer-service">خدمات مشتری</MenuItem>
                    <MenuItem value="sales">فروش</MenuItem>
                    <MenuItem value="technical">پشتیبانی فنی</MenuItem>
                    <MenuItem value="educational">آموزشی</MenuItem>
                  </CustomSelect>
                </Box>

                <Box>
                  <CustomFormLabel htmlFor="system-prompt">
                    پرامپت سیستم
                  </CustomFormLabel>
                  <CustomTextField
                    id="system-prompt"
                    fullWidth
                    multiline
                    rows={6}
                    value={promptData.systemPrompt}
                    onChange={(e) =>
                      handlePromptChange("systemPrompt", e.target.value)
                    }
                    placeholder="پرامپت سیستم که نقش و رفتار عامل را تعریف می‌کند..."
                    helperText="این پرامپت نقش، شخصیت و رفتار اصلی عامل را تعریف می‌کند"
                  />
                </Box>

                <Box>
                  <CustomFormLabel htmlFor="user-prompt">
                    قالب پرامپت کاربر
                  </CustomFormLabel>
                  <CustomTextField
                    id="user-prompt"
                    fullWidth
                    multiline
                    rows={4}
                    value={promptData.userPrompt}
                    onChange={(e) =>
                      handlePromptChange("userPrompt", e.target.value)
                    }
                    placeholder="قالب تعاملات کاربر را وارد کنید..."
                    helperText="این قالب نحوه پاسخ عامل به کاربران است"
                  />
                </Box>

                <Box>
                  <CustomFormLabel htmlFor="context-prompt">
                    پرامپت زمینه
                  </CustomFormLabel>
                  <CustomTextField
                    id="context-prompt"
                    fullWidth
                    multiline
                    rows={3}
                    value={promptData.contextPrompt}
                    onChange={(e) =>
                      handlePromptChange("contextPrompt", e.target.value)
                    }
                    placeholder="زمینه یا دستورالعمل‌های اضافی را وارد کنید..."
                    helperText="زمینه اضافی یا دستورالعمل‌های خاص برای عامل"
                  />
                </Box>

                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSave}
                  >
                    ذخیره پرامپت
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
