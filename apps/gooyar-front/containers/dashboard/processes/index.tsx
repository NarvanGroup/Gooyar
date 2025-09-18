"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import PageContainer from "@/components/container/PageContainer";
import ProcessesTable from "./components/ProcessesTable";
import { Process } from "./types";
import ProcessBuilderWizard from "./processBuilderWizard";
import CreateProcessDialog from "./components/CreateProcessDialog";
import {
  getProcessesService,
  createProcessService,
  deleteProcessService,
  toggleProcessStatusService,
} from "@/api/services/processesServices";
import { ProcessModel } from "@/api/services/processesServices/models";

const Processes = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [processes, setProcesses] = useState<ProcessModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load processes on component mount
  useEffect(() => {
    loadProcesses();
  }, []);

  const loadProcesses = async () => {
    try {
      setIsLoading(true);
      const response = await getProcessesService();
      if (response?.success) {
        setProcesses(response.data || []);
      } else {
        toast.error("Failed to load processes");
      }
    } catch (error) {
      console.error("Error loading processes:", error);
      toast.error("Failed to load processes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProcess = async (processData: any) => {
    try {
      const response = await createProcessService({
        name: processData.name || "فرآیند جدید",
        agent: "عامل جدید",
        contactPoints: ["واتساپ"],
        knowledgeBases: ["پایگاه دانش"],
        status: "فعال",
      });

      if (response?.success) {
        toast.success("Process created successfully");
        setOpenCreateDialog(false);
        loadProcesses(); // Reload processes
      } else {
        toast.error(response?.error || "Failed to create process");
      }
    } catch (error) {
      console.error("Error creating process:", error);
      toast.error("Failed to create process");
    }
  };

  const handleDeleteProcess = async (id: string) => {
    try {
      const response = await deleteProcessService(id);
      if (response?.success) {
        toast.success("Process deleted successfully");
        loadProcesses(); // Reload processes
      } else {
        toast.error(response?.error || "Failed to delete process");
      }
    } catch (error) {
      console.error("Error deleting process:", error);
      toast.error("Failed to delete process");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await toggleProcessStatusService(id);
      if (response?.success) {
        toast.success("Process status updated successfully");
        loadProcesses(); // Reload processes
      } else {
        toast.error(response?.error || "Failed to update process status");
      }
    } catch (error) {
      console.error("Error updating process status:", error);
      toast.error("Failed to update process status");
    }
  };

  return (
    <PageContainer title="فرآیندها" description="مدیریت فرآیندهای هوش مصنوعی">
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom color="text.primary">
              فرآیندها
            </Typography>
            <Typography variant="body1" color="text.secondary">
              مدیریت فرآیندهای هوش مصنوعی و اتوماسیون
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateDialog(true)}
            sx={{ minWidth: 200 }}
          >
            ایجاد فرآیند جدید
          </Button>
        </Box>

        {/* Processes Table */}
        <ProcessesTable
          processes={processes}
          onDelete={handleDeleteProcess}
          onToggleStatus={handleToggleStatus}
        />

        {/* Create Process Dialog */}
        <CreateProcessDialog
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
          onSubmit={handleCreateProcess}
        />
      </Box>
    </PageContainer>
  );
};

export default Processes;
