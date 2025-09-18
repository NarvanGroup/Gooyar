import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";

import Stack from "@mui/material/Stack";
import { Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { IconMenu2 } from "@tabler/icons-react";
// import emptyCart from "/public/images/products/empty-shopping-cart.svg";

import {
  Edit,
  ArrowBack,
  ArrowForward,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import AddAgentDialog from "./components/AddAgentDialog";
import AgentBoxSkeleton from "./components/AgentBoxSkeleton";
import {
  getAgentsService,
  createAgentService,
  deleteAgentService,
} from "@/api/services/agentsServices";
import { AgentModel } from "@/api/services/agentsServices/models";

const Agents = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const router = useRouter();
  const [showCreateAgent, setShowCreateAgent] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: "", description: "" });
  const [agents, setAgents] = useState<AgentModel[]>([]);

  // skeleton
  const [isLoading, setLoading] = React.useState(true);

  // Load agents on component mount
  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const response = await getAgentsService();
      if (response?.success) {
        setAgents(response.data || []);
      } else {
        toast.error("Failed to load agents");
      }
    } catch (error) {
      console.error("Error loading agents:", error);
      toast.error("Failed to load agents");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAgent = async () => {
    try {
      if (!newAgent.name.trim()) {
        toast.error("Agent name is required");
        return;
      }

      const response = await createAgentService({
        name: newAgent.name,
        description: newAgent.description,
        type: "chat",
      });

      if (response?.success) {
        toast.success("Agent created successfully");
        setNewAgent({ name: "", description: "" });
        setShowCreateAgent(false);
        loadAgents(); // Reload agents
      } else {
        toast.error(response?.error || "Failed to create agent");
      }
    } catch (error) {
      console.error("Error creating agent:", error);
      toast.error("Failed to create agent");
    }
  };

  const handleDeleteAgent = async (id: string) => {
    try {
      const response = await deleteAgentService(id);
      if (response?.success) {
        toast.success("Agent deleted successfully");
        loadAgents(); // Reload agents
      } else {
        toast.error(response?.error || "Failed to delete agent");
      }
    } catch (error) {
      console.error("Error deleting agent:", error);
      toast.error("Failed to delete agent");
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: "100%", width: "100%" }}>
      {/* ------------------------------------------- */}

      <Stack direction="row" justifyContent="space-between" pb={3}>
        {lgUp ? (
          <Box>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box>
                <Typography variant="h5" color="textPrimary">
                  عامل ها
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  بعد از ساختن عامل میتونی جزییاتش رو ویرایش کنی{" "}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ) : (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => router.back()}
              size="small"
            >
              بازگشت
            </Button>
          </Stack>
        )}
        <Box>
          {/* <ProductSearch /> */}
          <Button
            variant="contained"
            onClick={() => setShowCreateAgent(true)}
            sx={{ ml: 1 }}
          >
            افزودن
          </Button>
        </Box>
      </Stack>

      {/* ------------------------------------------- */}
      {/* Page Listing product */}
      {/* ------------------------------------------- */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {agents.length > 0 ? (
          <>
            {agents.map((agent) => (
              <Box
                key={agent.id}
                sx={{
                  width: { xs: "100%", sm: "49%" },
                  p: 1,
                }}
              >
                {/* ------------------------------------------- */}
                {/* Agent Card */}
                {/* ------------------------------------------- */}
                {isLoading ? (
                  <AgentBoxSkeleton />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "1px solid #e0e0e0",
                      p: 2,
                      borderRadius: 1,
                      width: "100%",
                      minWidth: 300,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography color="textPrimary" variant="h6">
                        {agent.name}
                      </Typography>
                      {agent.description && (
                        <Typography
                          color="textSecondary"
                          variant="body2"
                          sx={{ mt: 0.5 }}
                        >
                          {agent.description}
                        </Typography>
                      )}
                      <Typography
                        color="textSecondary"
                        variant="caption"
                        sx={{ mt: 1, display: "block" }}
                      >
                        وضعیت: {agent.status}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title="ویرایش">
                        <Fab
                          size="small"
                          color="primary"
                          onClick={() =>
                            router.push(`/dashboard/agents/${agent.id}`)
                          }
                        >
                          <Edit />
                        </Fab>
                      </Tooltip>
                      <Tooltip title="حذف">
                        <Fab
                          size="small"
                          color="error"
                          onClick={() => handleDeleteAgent(agent.id)}
                        >
                          <DeleteOutlineOutlined />
                        </Fab>
                      </Tooltip>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </>
        ) : (
          <Box sx={{ width: "100%", textAlign: "center", mt: 6 }}>
            <Typography variant="h2">هیچ عاملی وجود ندارد</Typography>
            <Typography variant="h6" mb={3}>
              هنوز عاملی ایجاد نکرده‌اید. برای شروع، یک عامل جدید ایجاد کنید.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setShowCreateAgent(true)}
            >
              ایجاد عامل جدید
            </Button>
          </Box>
        )}
      </Box>

      <AddAgentDialog
        showCreateAgent={showCreateAgent}
        setShowCreateAgent={setShowCreateAgent}
        newAgent={newAgent}
        setNewAgent={setNewAgent}
        handleCreateAgent={handleCreateAgent}
      />
    </Box>
  );
};

export default Agents;
