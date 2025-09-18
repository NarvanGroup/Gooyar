import express from "express";

const router = express.Router();

// Mock data for knowledge bases (in a real app, this would come from a database)
let knowledgeBases = [
  {
    id: "1",
    name: "test1",
    type: "mixed",
    dataCount: 2,
    description: "Test knowledge base",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
];

let knowledgeBaseData = [
  {
    id: "1",
    knowledge_base_id: "1",
    title: "https://kadoham.com/",
    type: "website",
    status: "completed",
    syncTime: "۴ دقیقه پیش",
    characterCount: 9998,
    url: "https://kadoham.com/",
    notifications: 6,
    content: null,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:04:00Z",
  },
  {
    id: "2",
    knowledge_base_id: "1",
    title: "this is my content",
    type: "content",
    status: "completed",
    syncTime: "۵ دقیقه پیش",
    characterCount: 18,
    url: null,
    notifications: 0,
    content: "this is my content",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:05:00Z",
  },
];

// Knowledge Base Routes
router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      data: knowledgeBases,
      total: knowledgeBases.length,
    });
  } catch (error) {
    console.error("Get knowledge bases error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch knowledge bases",
      message: error.message,
    });
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const knowledgeBase = knowledgeBases.find((kb) => kb.id === id);

    if (!knowledgeBase) {
      return res.status(404).json({
        success: false,
        error: "Knowledge base not found",
      });
    }

    res.json({
      success: true,
      data: knowledgeBase,
    });
  } catch (error) {
    console.error("Get knowledge base error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch knowledge base",
      message: error.message,
    });
  }
});

router.post("/", (req, res) => {
  try {
    const { title, description, type = "mixed" } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: "Knowledge base title is required",
      });
    }

    const newKnowledgeBase = {
      id: Date.now().toString(),
      name: title,
      type,
      dataCount: 0,
      description: description || "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    knowledgeBases.push(newKnowledgeBase);

    res.status(201).json({
      success: true,
      data: newKnowledgeBase,
      message: "Knowledge base created successfully",
    });
  } catch (error) {
    console.error("Create knowledge base error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create knowledge base",
      message: error.message,
    });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type } = req.body;

    const kbIndex = knowledgeBases.findIndex((kb) => kb.id === id);

    if (kbIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Knowledge base not found",
      });
    }

    knowledgeBases[kbIndex] = {
      ...knowledgeBases[kbIndex],
      ...(title && { name: title }),
      ...(description !== undefined && { description }),
      ...(type && { type }),
      updated_at: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: knowledgeBases[kbIndex],
      message: "Knowledge base updated successfully",
    });
  } catch (error) {
    console.error("Update knowledge base error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update knowledge base",
      message: error.message,
    });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const kbIndex = knowledgeBases.findIndex((kb) => kb.id === id);

    if (kbIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Knowledge base not found",
      });
    }

    // Also delete related data
    knowledgeBaseData = knowledgeBaseData.filter(
      (data) => data.knowledge_base_id !== id
    );

    knowledgeBases.splice(kbIndex, 1);

    res.json({
      success: true,
      message: "Knowledge base deleted successfully",
    });
  } catch (error) {
    console.error("Delete knowledge base error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete knowledge base",
      message: error.message,
    });
  }
});

// Knowledge Base Data Routes
router.get("/:id/data", (req, res) => {
  try {
    const { id } = req.params;
    const { search } = req.query;

    let data = knowledgeBaseData.filter(
      (item) => item.knowledge_base_id === id
    );

    // Apply search filter if provided
    if (search) {
      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          (item.content &&
            item.content.toLowerCase().includes(search.toLowerCase()))
      );
    }

    res.json({
      success: true,
      data: data,
      total: data.length,
    });
  } catch (error) {
    console.error("Get knowledge base data error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch knowledge base data",
      message: error.message,
    });
  }
});

router.post("/:id/data", (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, content, url, youtubeUrl, wordpressUrl, apiUrl } =
      req.body;

    if (!type || !title) {
      return res.status(400).json({
        success: false,
        error: "Type and title are required",
      });
    }

    // Check if knowledge base exists
    const knowledgeBase = knowledgeBases.find((kb) => kb.id === id);
    if (!knowledgeBase) {
      return res.status(404).json({
        success: false,
        error: "Knowledge base not found",
      });
    }

    const newData = {
      id: Date.now().toString(),
      knowledge_base_id: id,
      title,
      type,
      status: "pending",
      syncTime: "همین الان",
      characterCount: content?.length || 0,
      url: url || youtubeUrl || wordpressUrl || apiUrl,
      notifications: 0,
      content: content || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    knowledgeBaseData.push(newData);

    // Update knowledge base data count
    const kbIndex = knowledgeBases.findIndex((kb) => kb.id === id);
    if (kbIndex !== -1) {
      knowledgeBases[kbIndex].dataCount = knowledgeBaseData.filter(
        (d) => d.knowledge_base_id === id
      ).length;
    }

    res.status(201).json({
      success: true,
      data: newData,
      message: "Data added to knowledge base successfully",
    });
  } catch (error) {
    console.error("Add knowledge base data error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to add data to knowledge base",
      message: error.message,
    });
  }
});

router.put("/:id/data/:dataId", (req, res) => {
  try {
    const { id, dataId } = req.params;
    const { title, content, url } = req.body;

    const dataIndex = knowledgeBaseData.findIndex(
      (d) => d.id === dataId && d.knowledge_base_id === id
    );

    if (dataIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Knowledge base data not found",
      });
    }

    knowledgeBaseData[dataIndex] = {
      ...knowledgeBaseData[dataIndex],
      ...(title && { title }),
      ...(content !== undefined && { content }),
      ...(url !== undefined && { url }),
      characterCount:
        content?.length || knowledgeBaseData[dataIndex].characterCount,
      updated_at: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: knowledgeBaseData[dataIndex],
      message: "Knowledge base data updated successfully",
    });
  } catch (error) {
    console.error("Update knowledge base data error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update knowledge base data",
      message: error.message,
    });
  }
});

router.delete("/:id/data/:dataId", (req, res) => {
  try {
    const { id, dataId } = req.params;
    const dataIndex = knowledgeBaseData.findIndex(
      (d) => d.id === dataId && d.knowledge_base_id === id
    );

    if (dataIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Knowledge base data not found",
      });
    }

    knowledgeBaseData.splice(dataIndex, 1);

    // Update knowledge base data count
    const kbIndex = knowledgeBases.findIndex((kb) => kb.id === id);
    if (kbIndex !== -1) {
      knowledgeBases[kbIndex].dataCount = knowledgeBaseData.filter(
        (d) => d.knowledge_base_id === id
      ).length;
    }

    res.json({
      success: true,
      message: "Knowledge base data deleted successfully",
    });
  } catch (error) {
    console.error("Delete knowledge base data error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete knowledge base data",
      message: error.message,
    });
  }
});

router.post("/:id/data/:dataId/sync", (req, res) => {
  try {
    const { id, dataId } = req.params;
    const dataIndex = knowledgeBaseData.findIndex(
      (d) => d.id === dataId && d.knowledge_base_id === id
    );

    if (dataIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Knowledge base data not found",
      });
    }

    // Mock sync process
    knowledgeBaseData[dataIndex].status = "completed";
    knowledgeBaseData[dataIndex].syncTime = "همین الان";
    knowledgeBaseData[dataIndex].updated_at = new Date().toISOString();

    res.json({
      success: true,
      data: knowledgeBaseData[dataIndex],
      message: "Data synced successfully",
    });
  } catch (error) {
    console.error("Sync knowledge base data error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to sync knowledge base data",
      message: error.message,
    });
  }
});

export default router;
