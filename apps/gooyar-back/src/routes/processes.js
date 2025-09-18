import express from "express";

const router = express.Router();

// Mock data for processes (in a real app, this would come from a database)
let processes = [
  {
    id: "1",
    name: "پشتیبانی مشتریان",
    agent: "دستیار هوشمند",
    contactPoints: ["واتساپ", "تلفن"],
    knowledgeBases: ["FAQ", "راهنمای محصول"],
    status: "فعال",
    createdAt: "۱۴۰۲/۱۲/۱۵",
    lastActivity: "۲ ساعت پیش",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T12:00:00Z",
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
    created_at: "2024-01-10T10:00:00Z",
    updated_at: "2024-01-14T10:00:00Z",
  },
];

// Get all processes
router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      data: processes,
      total: processes.length,
    });
  } catch (error) {
    console.error("Get processes error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch processes",
      message: error.message,
    });
  }
});

// Get process by ID
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const process = processes.find((p) => p.id === id);

    if (!process) {
      return res.status(404).json({
        success: false,
        error: "Process not found",
      });
    }

    res.json({
      success: true,
      data: process,
    });
  } catch (error) {
    console.error("Get process error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch process",
      message: error.message,
    });
  }
});

// Create new process
router.post("/", (req, res) => {
  try {
    const {
      name,
      agent,
      contactPoints = [],
      knowledgeBases = [],
      status = "فعال",
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Process name is required",
      });
    }

    const newProcess = {
      id: Date.now().toString(),
      name,
      agent: agent || "عامل جدید",
      contactPoints,
      knowledgeBases,
      status,
      createdAt: new Date().toLocaleDateString("fa-IR"),
      lastActivity: "همین الان",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    processes.push(newProcess);

    res.status(201).json({
      success: true,
      data: newProcess,
      message: "Process created successfully",
    });
  } catch (error) {
    console.error("Create process error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create process",
      message: error.message,
    });
  }
});

// Update process
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name, agent, contactPoints, knowledgeBases, status } = req.body;

    const processIndex = processes.findIndex((p) => p.id === id);

    if (processIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Process not found",
      });
    }

    processes[processIndex] = {
      ...processes[processIndex],
      ...(name && { name }),
      ...(agent && { agent }),
      ...(contactPoints && { contactPoints }),
      ...(knowledgeBases && { knowledgeBases }),
      ...(status && { status }),
      updated_at: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: processes[processIndex],
      message: "Process updated successfully",
    });
  } catch (error) {
    console.error("Update process error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update process",
      message: error.message,
    });
  }
});

// Delete process
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const processIndex = processes.findIndex((p) => p.id === id);

    if (processIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Process not found",
      });
    }

    processes.splice(processIndex, 1);

    res.json({
      success: true,
      message: "Process deleted successfully",
    });
  } catch (error) {
    console.error("Delete process error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete process",
      message: error.message,
    });
  }
});

// Toggle process status
router.patch("/:id/toggle-status", (req, res) => {
  try {
    const { id } = req.params;
    const processIndex = processes.findIndex((p) => p.id === id);

    if (processIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Process not found",
      });
    }

    const newStatus =
      processes[processIndex].status === "فعال" ? "غیرفعال" : "فعال";
    processes[processIndex].status = newStatus;
    processes[processIndex].lastActivity = "همین الان";
    processes[processIndex].updated_at = new Date().toISOString();

    res.json({
      success: true,
      data: processes[processIndex],
      message: `Process status changed to ${newStatus}`,
    });
  } catch (error) {
    console.error("Toggle process status error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to toggle process status",
      message: error.message,
    });
  }
});

// Get process statistics
router.get("/:id/stats", (req, res) => {
  try {
    const { id } = req.params;
    const process = processes.find((p) => p.id === id);

    if (!process) {
      return res.status(404).json({
        success: false,
        error: "Process not found",
      });
    }

    // Mock statistics
    const stats = {
      totalConversations: Math.floor(Math.random() * 1000) + 100,
      activeConversations: Math.floor(Math.random() * 50) + 10,
      totalMessages: Math.floor(Math.random() * 5000) + 500,
      averageResponseTime: Math.floor(Math.random() * 30) + 5, // seconds
      satisfactionRate: Math.floor(Math.random() * 30) + 70, // percentage
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Get process stats error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch process statistics",
      message: error.message,
    });
  }
});

export default router;
