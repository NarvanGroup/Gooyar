import express from "express";

const router = express.Router();

// Mock data for agents (in a real app, this would come from a database)
let agents = [
  {
    id: "1",
    name: "دستیار هوشمند",
    description: "دستیار هوشمند برای پاسخگویی به سوالات مشتریان",
    type: "chat",
    status: "active",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "کارشناس فروش",
    description: "عامل فروش برای راهنمایی مشتریان در خرید محصولات",
    type: "sales",
    status: "active",
    created_at: "2024-01-10T08:30:00Z",
    updated_at: "2024-01-12T14:20:00Z",
  },
];

// Get all agents
router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      data: agents,
      total: agents.length,
    });
  } catch (error) {
    console.error("Get agents error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch agents",
      message: error.message,
    });
  }
});

// Get agent by ID
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const agent = agents.find((a) => a.id === id);

    if (!agent) {
      return res.status(404).json({
        success: false,
        error: "Agent not found",
      });
    }

    res.json({
      success: true,
      data: agent,
    });
  } catch (error) {
    console.error("Get agent error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch agent",
      message: error.message,
    });
  }
});

// Create new agent
router.post("/", (req, res) => {
  try {
    const { name, description, type = "chat" } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Agent name is required",
      });
    }

    const newAgent = {
      id: Date.now().toString(),
      name,
      description: description || "",
      type,
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    agents.push(newAgent);

    res.status(201).json({
      success: true,
      data: newAgent,
      message: "Agent created successfully",
    });
  } catch (error) {
    console.error("Create agent error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create agent",
      message: error.message,
    });
  }
});

// Update agent
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type, status } = req.body;

    const agentIndex = agents.findIndex((a) => a.id === id);

    if (agentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Agent not found",
      });
    }

    agents[agentIndex] = {
      ...agents[agentIndex],
      ...(name && { name }),
      ...(description !== undefined && { description }),
      ...(type && { type }),
      ...(status && { status }),
      updated_at: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: agents[agentIndex],
      message: "Agent updated successfully",
    });
  } catch (error) {
    console.error("Update agent error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update agent",
      message: error.message,
    });
  }
});

// Delete agent
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const agentIndex = agents.findIndex((a) => a.id === id);

    if (agentIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Agent not found",
      });
    }

    agents.splice(agentIndex, 1);

    res.json({
      success: true,
      message: "Agent deleted successfully",
    });
  } catch (error) {
    console.error("Delete agent error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete agent",
      message: error.message,
    });
  }
});

export default router;
