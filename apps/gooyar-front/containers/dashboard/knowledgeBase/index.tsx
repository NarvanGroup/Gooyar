"use client";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { toast } from "react-hot-toast";
import PageContainer from "@/components/container/PageContainer";

// Import components
import KnowledgeBaseList from "./components/KnowledgeBaseList";
import DataManagement from "./components/DataManagement";
import CreateKnowledgeBaseDialog from "./components/CreateKnowledgeBaseDialog";
import AddDataDialog from "./components/AddDataDialog";
import EditDataDialog from "./components/EditDataDialog";

// Import services
import {
  getKnowledgeBasesService,
  createKnowledgeBaseService,
  getKnowledgeBaseDataService,
  addKnowledgeBaseDataService,
  updateKnowledgeBaseDataService,
  deleteKnowledgeBaseDataService,
  syncKnowledgeBaseDataService,
} from "@/api/services/knowledgeBaseServices";
import {
  KnowledgeBaseModel,
  KnowledgeBaseDataModel,
} from "@/api/services/knowledgeBaseServices/models";

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
  const [selectedBase, setSelectedBase] = useState<KnowledgeBaseModel | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openAddDataDialog, setOpenAddDataDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingData, setEditingData] = useState<KnowledgeBaseDataModel | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  // State for knowledge bases and data
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBaseModel[]>(
    []
  );
  const [knowledgeBaseData, setKnowledgeBaseData] = useState<
    KnowledgeBaseDataModel[]
  >([]);

  // Load knowledge bases on component mount
  useEffect(() => {
    loadKnowledgeBases();
  }, []);

  // Load knowledge base data when selected base changes
  useEffect(() => {
    if (selectedBase) {
      loadKnowledgeBaseData(selectedBase.id);
    }
  }, [selectedBase, searchQuery]);

  const loadKnowledgeBases = async () => {
    try {
      setIsLoading(true);
      const response = await getKnowledgeBasesService();
      if (response?.success) {
        setKnowledgeBases(response.data || []);
        // Select first knowledge base if available
        if (response.data && response.data.length > 0 && !selectedBase) {
          setSelectedBase(response.data[0]);
        }
      } else {
        toast.error("Failed to load knowledge bases");
      }
    } catch (error) {
      console.error("Error loading knowledge bases:", error);
      toast.error("Failed to load knowledge bases");
    } finally {
      setIsLoading(false);
    }
  };

  const loadKnowledgeBaseData = async (knowledgeBaseId: string) => {
    try {
      setIsLoading(true);
      const response = await getKnowledgeBaseDataService(
        knowledgeBaseId,
        searchQuery
      );
      if (response?.success) {
        setKnowledgeBaseData(response.data || []);
      } else {
        toast.error("Failed to load knowledge base data");
      }
    } catch (error) {
      console.error("Error loading knowledge base data:", error);
      toast.error("Failed to load knowledge base data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateKnowledgeBase = async (data: {
    title: string;
    description: string;
  }) => {
    try {
      const response = await createKnowledgeBaseService({
        title: data.title,
        description: data.description,
        type: "mixed",
      });

      if (response?.success) {
        toast.success("Knowledge base created successfully");
        setOpenCreateDialog(false);
        loadKnowledgeBases(); // Reload knowledge bases
      } else {
        toast.error(response?.error || "Failed to create knowledge base");
      }
    } catch (error) {
      console.error("Error creating knowledge base:", error);
      toast.error("Failed to create knowledge base");
    }
  };

  const handleAddData = async (data: {
    type: string;
    title: string;
    content?: string;
    url?: string;
    youtubeUrl?: string;
    wordpressUrl?: string;
    apiUrl?: string;
  }) => {
    if (!selectedBase) {
      toast.error("Please select a knowledge base first");
      return;
    }

    try {
      const response = await addKnowledgeBaseDataService(selectedBase.id, data);
      if (response?.success) {
        toast.success("Data added to knowledge base successfully");
        setOpenAddDataDialog(false);
        loadKnowledgeBaseData(selectedBase.id); // Reload data
        loadKnowledgeBases(); // Reload knowledge bases to update count
      } else {
        toast.error(response?.error || "Failed to add data");
      }
    } catch (error) {
      console.error("Error adding data:", error);
      toast.error("Failed to add data");
    }
  };

  const handleEditData = (data: KnowledgeBaseDataModel) => {
    setEditingData(data);
    setOpenEditDialog(true);
  };

  const handleUpdateData = async (updatedData: KnowledgeBaseDataModel) => {
    if (!selectedBase) return;

    try {
      const response = await updateKnowledgeBaseDataService(
        selectedBase.id,
        updatedData.id,
        {
          title: updatedData.title,
          content: updatedData.content,
          url: updatedData.url,
        }
      );

      if (response?.success) {
        toast.success("Data updated successfully");
        setOpenEditDialog(false);
        loadKnowledgeBaseData(selectedBase.id); // Reload data
      } else {
        toast.error(response?.error || "Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data");
    }
  };

  const handleDeleteData = async (id: string) => {
    if (!selectedBase) return;

    try {
      const response = await deleteKnowledgeBaseDataService(
        selectedBase.id,
        id
      );
      if (response?.success) {
        toast.success("Data deleted successfully");
        loadKnowledgeBaseData(selectedBase.id); // Reload data
        loadKnowledgeBases(); // Reload knowledge bases to update count
      } else {
        toast.error(response?.error || "Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Failed to delete data");
    }
  };

  const handleSyncData = async (id: string) => {
    if (!selectedBase) return;

    try {
      const response = await syncKnowledgeBaseDataService(selectedBase.id, id);
      if (response?.success) {
        toast.success("Data synced successfully");
        loadKnowledgeBaseData(selectedBase.id); // Reload data
      } else {
        toast.error(response?.error || "Failed to sync data");
      }
    } catch (error) {
      console.error("Error syncing data:", error);
      toast.error("Failed to sync data");
    }
  };

  return (
    <PageContainer title="پایگاه های دانش" description="مدیریت پایگاه های دانش">
      <Box
        sx={{ display: "flex", height: "calc(100vh - 200px)", width: "100%" }}
      >
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
