"use client";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import PageContainer from "@/components/container/PageContainer";
import ProcessesTable from "./components/ProcessesTable";
import { Process } from "./types";
import ProcessBuilderWizard from "./processBuilderWizard";
import CreateProcessDialog from "./components/CreateProcessDialog";

const Processes = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [processes, setProcesses] = useState<Process[]>([
    {
      id: "1",
      name: "پشتیبانی مشتریان",
      agent: "دستیار هوشمند",
      contactPoints: ["واتساپ", "تلفن"],
      knowledgeBases: ["FAQ", "راهنمای محصول"],
      status: "فعال",
      createdAt: "۱۴۰۲/۱۲/۱۵",
      lastActivity: "۲ ساعت پیش",
    },
    {
      id: "2",
      name: "فروش و مشاوره",
      agent: "کارشناس فروش",
      contactPoints: ["تلگرام", "ایمیل"],
      knowledgeBases: ["کاتالوگ محصولات", "قیمت‌ها"],
      status: "غیرفعال",
      createdAt: "۱۴۰۲/۱۲/۱۰",
      lastActivity: "۱ روز پیش",
    },
  ]);

  const handleCreateProcess = (processData: any) => {
    // Here you would typically save to API
    const newProcess: Process = {
      id: Date.now().toString(),
      name: processData.name || "فرآیند جدید",
      agent: "عامل جدید",
      contactPoints: ["واتساپ"],
      knowledgeBases: ["پایگاه دانش"],
      status: "فعال",
      createdAt: new Date().toLocaleDateString("fa-IR"),
      lastActivity: "همین الان",
    };

    setProcesses([...processes, newProcess]);
    setOpenCreateDialog(false);
  };

  const handleDeleteProcess = (id: string) => {
    setProcesses(processes.filter((process) => process.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setProcesses(
      processes.map((process) =>
        process.id === id
          ? {
              ...process,
              status: process.status === "فعال" ? "غیرفعال" : "فعال",
            }
          : process
      )
    );
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
