import React, { useState, useEffect, useCallback } from "react";
import { Box, Tabs, Tab, Typography, Button, Stack } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import SettingsTab from "./SettingsTab";
import PromptTab from "./PromptTab";
import ActionsTab from "./ActionsTab";
import VariablesTab from "./VariablesTab";
import {
  getAgentByIdService,
  updateAgentService,
} from "@/api/services/agentsServices";
import { AgentModel } from "@/api/services/agentsServices/models";

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
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [agent, setAgent] = useState<AgentModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const loadAgentDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAgentByIdService(agentId);
      if (response?.success && response.data) {
        setAgent(response.data);
      } else {
        toast.error("Failed to load agent details");
        router.push("/dashboard/agents");
      }
    } catch (error) {
      console.error("Error loading agent details:", error);
      toast.error("Failed to load agent details");
      router.push("/dashboard/agents");
    } finally {
      setLoading(false);
    }
  }, [agentId, router]);

  // Load agent details
  useEffect(() => {
    loadAgentDetails();
  }, [loadAgentDetails]);

  const handleSaveAgent = async (updatedData: Partial<AgentModel>) => {
    if (!agent) return;

    try {
      setSaving(true);
      const response = await updateAgentService(agent.id, updatedData);
      if (response?.success) {
        toast.success("Agent updated successfully");
        setAgent({ ...agent, ...updatedData });
      } else {
        toast.error(response?.error || "Failed to update agent");
      }
    } catch (error) {
      console.error("Error updating agent:", error);
      toast.error("Failed to update agent");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", minHeight: "100%", p: 3 }}>
        <Typography>Loading agent details...</Typography>
      </Box>
    );
  }

  if (!agent) {
    return (
      <Box sx={{ width: "100%", minHeight: "100%", p: 3 }}>
        <Typography>Agent not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 3, pb: 0 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom color="textPrimary">
            {agent.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ویرایش جزئیات عامل
          </Typography>
        </Box>{" "}
        <Button
          variant="outlined"
          startIcon={<ArrowForward />}
          onClick={() => router.back()}
          size="small"
        >
          بازگشت
        </Button>
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
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
        <SettingsTab agent={agent} onSave={handleSaveAgent} saving={saving} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <PromptTab agent={agent} onSave={handleSaveAgent} saving={saving} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <ActionsTab agent={agent} onSave={handleSaveAgent} saving={saving} />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <VariablesTab agent={agent} onSave={handleSaveAgent} saving={saving} />
      </TabPanel>
    </Box>
  );
};

export default AgentDetail;
