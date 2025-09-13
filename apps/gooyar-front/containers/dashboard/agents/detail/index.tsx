import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";

import SettingsTab from "./SettingsTab";
import PromptTab from "./PromptTab";
import ActionsTab from "./ActionsTab";
import VariablesTab from "./VariablesTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`agent-tabpanel-${index}`}
      aria-labelledby={`agent-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `agent-tab-${index}`,
    "aria-controls": `agent-tabpanel-${index}`,
  };
}

interface AgentDetailProps {
  agentId: string;
}

const AgentDetail: React.FC<AgentDetailProps> = ({ agentId }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100%" }}>
      <Typography variant="h4" m={3} gutterBottom color="textPrimary">
        جزئیات عامل - شناسه: {agentId}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="agent detail tabs"
        >
          <Tab label="تنظیمات" {...a11yProps(0)} />
          <Tab label="پرامپت" {...a11yProps(1)} />
          <Tab label="عملیات" {...a11yProps(2)} />
          <Tab label="متغیرها" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <SettingsTab agentId={agentId} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <PromptTab agentId={agentId} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <ActionsTab agentId={agentId} />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <VariablesTab agentId={agentId} />
      </TabPanel>
    </Box>
  );
};

export default AgentDetail;
