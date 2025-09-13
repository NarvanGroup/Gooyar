"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";

// Import components
import KnowledgeBaseList from "./components/KnowledgeBaseList";
import DataManagement from "./components/DataManagement";
import CreateKnowledgeBaseDialog from "./components/CreateKnowledgeBaseDialog";
import AddDataDialog from "./components/AddDataDialog";
import EditDataDialog from "./components/EditDataDialog";

interface KnowledgeBase {
  id: string;
  name: string;
  type: string;
  dataCount: number;
  description?: string;
}

interface KnowledgeBaseData {
  id: string;
  title: string;
  type: string;
  status: "completed" | "pending" | "failed";
  syncTime: string;
  characterCount: number;
  url?: string;
  notifications?: number;
}

const KnowledgeBase = () => {
  const [selectedBase, setSelectedBase] = useState<KnowledgeBase | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openAddDataDialog, setOpenAddDataDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingData, setEditingData] = useState<KnowledgeBaseData | null>(
    null
  );

  // Mock data
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([
    { id: "1", name: "test1", type: "mixed", dataCount: 2 },
  ]);

  const [knowledgeBaseData, setKnowledgeBaseData] = useState<
    KnowledgeBaseData[]
  >([
    {
      id: "1",
      title: "https://kadoham.com/",
      type: "website",
      status: "completed",
      syncTime: "۴ دقیقه پیش",
      characterCount: 9998,
      url: "https://kadoham.com/",
      notifications: 6,
    },
    {
      id: "2",
      title: "this is my content",
      type: "content",
      status: "completed",
      syncTime: "۵ دقیقه پیش",
      characterCount: 18,
    },
  ]);

  const handleCreateKnowledgeBase = (data: {
    title: string;
    description: string;
  }) => {
    const newBase: KnowledgeBase = {
      id: Date.now().toString(),
      name: data.title,
      type: "mixed",
      dataCount: 0,
      description: data.description,
    };
    setKnowledgeBases([...knowledgeBases, newBase]);
  };

  const handleAddData = (data: {
    type: string;
    title: string;
    content?: string;
    url?: string;
    youtubeUrl?: string;
    wordpressUrl?: string;
    apiUrl?: string;
  }) => {
    const newData: KnowledgeBaseData = {
      id: Date.now().toString(),
      title: data.title,
      type: data.type,
      status: "pending",
      syncTime: "همین الان",
      characterCount: data.content?.length || 0,
      url: data.url || data.youtubeUrl || data.wordpressUrl || data.apiUrl,
    };
    setKnowledgeBaseData([...knowledgeBaseData, newData]);
  };

  const handleEditData = (data: KnowledgeBaseData) => {
    setEditingData(data);
    setOpenEditDialog(true);
  };

  const handleUpdateData = (updatedData: KnowledgeBaseData) => {
    setKnowledgeBaseData(
      knowledgeBaseData.map((item) =>
        item.id === updatedData.id ? updatedData : item
      )
    );
  };

  const handleDeleteData = (id: string) => {
    setKnowledgeBaseData(knowledgeBaseData.filter((item) => item.id !== id));
  };

  const handleSyncData = (id: string) => {
    // Handle syncing data
    console.log("Sync data with id:", id);
  };

  return (
    <PageContainer title="پایگاه های دانش" description="مدیریت پایگاه های دانش">
      <Box sx={{ display: "flex", height: "calc(100vh - 200px)" }}>
        {/* Right Column - Knowledge Base Selection */}
        <KnowledgeBaseList
          knowledgeBases={knowledgeBases}
          selectedBase={selectedBase}
          onSelectBase={setSelectedBase}
          onCreateNew={() => setOpenCreateDialog(true)}
        />

        {/* Left Column - Data Management */}
        <DataManagement
          selectedBase={selectedBase}
          knowledgeBaseData={knowledgeBaseData}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddData={() => setOpenAddDataDialog(true)}
          onEditData={handleEditData}
          onDeleteData={handleDeleteData}
          onSyncData={handleSyncData}
        />
      </Box>

      {/* Create Knowledge Base Dialog */}
      <CreateKnowledgeBaseDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onSubmit={handleCreateKnowledgeBase}
      />

      {/* Add Data Dialog */}
      <AddDataDialog
        open={openAddDataDialog}
        onClose={() => setOpenAddDataDialog(false)}
        onSubmit={handleAddData}
      />

      {/* Edit Data Dialog */}
      <EditDataDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onSubmit={handleUpdateData}
        editingData={editingData}
      />
    </PageContainer>
  );
};

export default KnowledgeBase;
