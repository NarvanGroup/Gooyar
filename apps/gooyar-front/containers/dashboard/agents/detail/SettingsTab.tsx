import React, { useState, useEffect } from "react";
import {
  Box,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Slider,
  Button,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";

import CustomFormLabel from "@/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";
import CustomSelect from "@/components/forms/theme-elements/CustomSelect";
import { AgentModel } from "@/api/services/agentsServices/models";

interface SettingsTabProps {
  agent: AgentModel;
  onSave: (data: Partial<AgentModel>) => Promise<void>;
  saving: boolean;
}

const agentTypes = [
  { value: "voice", label: "صوتی" },
  { value: "text", label: "متنی" },
  { value: "both", label: "هر دو" },
];

const voiceTypes = [
  { value: "calm", label: "آرام" },
  { value: "happy", label: "شاد" },
  { value: "professional", label: "حرفه‌ای" },
  { value: "friendly", label: "دوستانه" },
];

const languages = [
  { value: "Farsi", label: "فارسی" },
  { value: "Arabic", label: "عربی" },
  { value: "English", label: "انگلیسی" },
  { value: "Azari", label: "آذری" },
  { value: "Kurdi", label: "کردی" },
];

const ambientSounds = [
  { value: false, label: "غیرفعال" },
  { value: true, label: "فعال" },
  { value: "coffee shop", label: "کافه" },
  { value: "office", label: "دفتر" },
  { value: "nature", label: "طبیعت" },
  { value: "silence", label: "سکوت" },
];

const agentPurposes = [
  { value: "customer-service", label: "خدمات مشتری" },
  { value: "receptionist", label: "پذیرش" },
  { value: "sales", label: "فروش" },
  { value: "support", label: "پشتیبانی" },
  { value: "general", label: "عمومی" },
];

const tones = [
  { value: "friendly", label: "دوستانه" },
  { value: "professional", label: "حرفه‌ای" },
  { value: "casual", label: "غیررسمی" },
  { value: "formal", label: "رسمی" },
];

const SettingsTab: React.FC<SettingsTabProps> = ({ agent, onSave, saving }) => {
  const [formData, setFormData] = useState({
    name: agent.name || "",
    "agent-type": agent["agent-type"] || "text",
    voice: agent.voice || "calm",
    language: agent.language || "Farsi",
    "ambient-sound": agent["ambient-sound"] || false,
    "company-info": agent["company-info"] || "",
    "agent-objective": agent["agent-objective"] || "",
    "agent-purpose": agent["agent-purpose"] || "general",
    "custom-greeting": agent["custom-greeting"] || "",
    prompt: agent.prompt || "",
    tone: agent.tone || "friendly",
  });

  const [voiceSettings, setVoiceSettings] = useState({
    speed: 1,
    pitch: 1,
    volume: 1,
    enableEcho: false,
    noiseReduction: false,
  });

  // Update form data when agent changes
  useEffect(() => {
    setFormData({
      name: agent.name || "",
      "agent-type": agent["agent-type"] || "text",
      voice: agent.voice || "calm",
      language: agent.language || "Farsi",
      "ambient-sound": agent["ambient-sound"] || false,
      "company-info": agent["company-info"] || "",
      "agent-objective": agent["agent-objective"] || "",
      "agent-purpose": agent["agent-purpose"] || "general",
      "custom-greeting": agent["custom-greeting"] || "",
      prompt: agent.prompt || "",
      tone: agent.tone || "friendly",
    });
  }, [agent]);

  const handleFormChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVoiceSettingsChange = (
    field: string,
    value: number | boolean
  ) => {
    setVoiceSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography color="textPrimary" variant="h6" mb={3}>
        تنظیمات
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Main Form Fields */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
            <CustomFormLabel htmlFor="fs-name">نام عامل</CustomFormLabel>
            <CustomTextField
              id="fs-name"
              fullWidth
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFormChange("name", e.target.value)
              }
              required
            />
          </Box>

          <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
            <CustomFormLabel htmlFor="fs-agent-type">نوع عامل</CustomFormLabel>
            <CustomSelect
              id="fs-agent-type"
              value={formData["agent-type"]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFormChange("agent-type", e.target.value)
              }
              fullWidth
              variant="outlined"
            >
              {agentTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
          </Box>

          <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
            <CustomFormLabel htmlFor="fs-voice">نوع صدا</CustomFormLabel>
            <CustomSelect
              id="fs-voice"
              value={formData.voice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFormChange("voice", e.target.value)
              }
              fullWidth
              variant="outlined"
            >
              {voiceTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
          </Box>

          <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
            <CustomFormLabel htmlFor="fs-language">زبان</CustomFormLabel>
            <CustomSelect
              id="fs-language"
              value={formData.language}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFormChange("language", e.target.value)
              }
              fullWidth
              variant="outlined"
            >
              {languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
          </Box>

          <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
            <CustomFormLabel htmlFor="fs-ambient">صدای محیطی</CustomFormLabel>
            <CustomSelect
              id="fs-ambient"
              value={formData["ambient-sound"]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFormChange("ambient-sound", e.target.value)
              }
              fullWidth
              variant="outlined"
            >
              {ambientSounds.map((option) => (
                <MenuItem
                  key={String(option.value)}
                  value={String(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
          </Box>

          <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
            <CustomFormLabel htmlFor="fs-purpose">هدف عامل</CustomFormLabel>
            <CustomSelect
              id="fs-purpose"
              value={formData["agent-purpose"]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFormChange("agent-purpose", e.target.value)
              }
              fullWidth
              variant="outlined"
            >
              {agentPurposes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
          </Box>

          <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
            <CustomFormLabel htmlFor="fs-tone">لحن</CustomFormLabel>
            <CustomSelect
              id="fs-tone"
              value={formData.tone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFormChange("tone", e.target.value)
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
        </Box>

        {/* Full Width Fields */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <CustomFormLabel htmlFor="fs-company">اطلاعات شرکت</CustomFormLabel>
            <CustomTextField
              id="fs-company"
              fullWidth
              multiline
              rows={3}
              value={formData["company-info"]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFormChange("company-info", e.target.value)
              }
              placeholder="اطلاعات شرکت را وارد کنید..."
            />
          </Box>

          <Box>
            <CustomFormLabel htmlFor="fs-objective">هدف عامل</CustomFormLabel>
            <CustomTextField
              id="fs-objective"
              fullWidth
              multiline
              rows={4}
              value={formData["agent-objective"]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFormChange("agent-objective", e.target.value)
              }
              placeholder="هدف و منظور عامل را توصیف کنید..."
              required
            />
          </Box>
        </Box>

        {/* Buttons */}
        <Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={saving}
              startIcon={saving ? <CircularProgress size={20} /> : null}
            >
              {saving ? "در حال ذخیره..." : "ذخیره تنظیمات"}
            </Button>
            <Button variant="text" color="error" disabled={saving}>
              انصراف
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Voice Settings Section */}
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              تنظیمات صدا
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <Typography gutterBottom>سرعت</Typography>
                <Slider
                  value={voiceSettings.speed}
                  onChange={(e: Event, value: number | number[]) =>
                    handleVoiceSettingsChange("speed", value as number)
                  }
                  min={0.5}
                  max={2}
                  step={0.1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}x`}
                />
              </Box>

              <Box>
                <Typography gutterBottom>زیر و بم</Typography>
                <Slider
                  value={voiceSettings.pitch}
                  onChange={(e: Event, value: number | number[]) =>
                    handleVoiceSettingsChange("pitch", value as number)
                  }
                  min={0.5}
                  max={2}
                  step={0.1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}x`}
                />
              </Box>

              <Box>
                <Typography gutterBottom>بلندی صدا</Typography>
                <Slider
                  value={voiceSettings.volume}
                  onChange={(e: Event, value: number | number[]) =>
                    handleVoiceSettingsChange("volume", value as number)
                  }
                  min={0}
                  max={1}
                  step={0.1}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                />
              </Box>

              <Divider />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={voiceSettings.enableEcho}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleVoiceSettingsChange(
                          "enableEcho",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="فعال کردن اکو"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={voiceSettings.noiseReduction}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleVoiceSettingsChange(
                          "noiseReduction",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="کاهش نویز"
                />
              </Box>

              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => console.log("Voice settings:", voiceSettings)}
                >
                  تست صدا
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SettingsTab;
