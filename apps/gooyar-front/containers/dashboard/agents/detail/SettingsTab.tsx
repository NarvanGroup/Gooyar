import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
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
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import CustomFormLabel from "@/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/components/forms/theme-elements/CustomTextField";
import CustomOutlinedInput from "@/components/forms/theme-elements/CustomOutlinedInput";
import CustomSelect from "@/components/forms/theme-elements/CustomSelect";

interface SettingsTabProps {
  agentId: string;
}

const countries = [
  {
    value: "iran",
    label: "ایران",
  },
  {
    value: "afghanistan",
    label: "افغانستان",
  },
  {
    value: "tajikistan",
    label: "تاجیکستان",
  },
];

const lang = [
  {
    value: "fa",
    label: "فارسی",
  },
  {
    value: "en",
    label: "انگلیسی",
  },
  {
    value: "ar",
    label: "عربی",
  },
];

const SettingsTab: React.FC<SettingsTabProps> = ({ agentId }) => {
  const [formData, setFormData] = useState({
    agentName: "",
    voice: "",
    language: "",
    ambientSound: false,
    ambientSoundLevel: 50,
    companyInfo: "",
    agentObjective: "",
  });

  const [voiceSettings, setVoiceSettings] = useState({
    speed: 1,
    pitch: 1,
    volume: 1,
    enableEcho: false,
    noiseReduction: false,
  });

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVoiceSettingsChange = (field: string, value: any) => {
    setVoiceSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    console.log("Voice settings:", voiceSettings);
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
            <CustomFormLabel htmlFor="fs-uname">نام</CustomFormLabel>
            <CustomTextField
              id="fs-uname"
              fullWidth
              value={formData.agentName}
              onChange={(e) => handleFormChange("agentName", e.target.value)}
              required
            />
          </Box>

          <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
            <CustomFormLabel htmlFor="fs-voice">انتخاب صدا</CustomFormLabel>
            <CustomSelect
              id="fs-voice"
              value={formData.voice}
              onChange={(e) => handleFormChange("voice", e.target.value)}
              fullWidth
              variant="outlined"
            >
              {countries.map((option) => (
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
              onChange={(e) => handleFormChange("language", e.target.value)}
              fullWidth
              variant="outlined"
            >
              {lang.map((option) => (
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
              value={formData.ambientSound ? "enabled" : "disabled"}
              onChange={(e) =>
                handleFormChange("ambientSound", e.target.value === "enabled")
              }
              fullWidth
              variant="outlined"
            >
              <MenuItem value="enabled">فعال</MenuItem>
              <MenuItem value="disabled">غیرفعال</MenuItem>
            </CustomSelect>
          </Box>
        </Box>

        {/* Full Width Fields */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <CustomFormLabel htmlFor="fs-company">کمپانی</CustomFormLabel>
            <CustomTextField
              id="fs-company"
              fullWidth
              multiline
              rows={3}
              value={formData.companyInfo}
              onChange={(e) => handleFormChange("companyInfo", e.target.value)}
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
              value={formData.agentObjective}
              onChange={(e) =>
                handleFormChange("agentObjective", e.target.value)
              }
              placeholder="هدف و منظور عامل را توصیف کنید..."
              required
            />
          </Box>
        </Box>

        {/* Buttons */}
        <Box>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" type="submit">
              ارسال
            </Button>
            <Button variant="text" color="error">
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
                  onChange={(e, value) =>
                    handleVoiceSettingsChange("speed", value)
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
                  onChange={(e, value) =>
                    handleVoiceSettingsChange("pitch", value)
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
                  onChange={(e, value) =>
                    handleVoiceSettingsChange("volume", value)
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
                      onChange={(e) =>
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
                      onChange={(e) =>
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
