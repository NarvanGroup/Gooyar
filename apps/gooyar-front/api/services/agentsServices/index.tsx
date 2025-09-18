import { api } from "@/api";
import { axiosMethods } from "@/shared/constants/axiosMethods";
import { apiVersion1 } from "@/api/config";

const agentsServiceBaseURL = `${apiVersion1}/agents`;

// Get all agents
export const getAgentsService = async () => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: agentsServiceBaseURL,
      isAuthorizationNeeded: false,
    });
    return response;
  } catch (error) {
    console.error("Get agents error:", error);
    throw error;
  }
};

// Get agent by ID
export const getAgentByIdService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${agentsServiceBaseURL}/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Get agent by ID error:", error);
    throw error;
  }
};

// Create new agent
export const createAgentService = async (data: {
  name: string;
  description?: string;
  type?: string;
  "agent-type"?: "voice" | "text" | "both";
  voice?: "calm" | "happy" | "professional" | "friendly";
  language?: "Farsi" | "Arabic" | "English" | "Azari" | "Kurdi";
  "ambient-sound"?: boolean | "coffee shop" | "office" | "nature" | "silence";
  "company-info"?: string;
  "agent-objective"?: string;
  "agent-purpose"?:
    | "customer-service"
    | "receptionist"
    | "sales"
    | "support"
    | "general";
  "custom-greeting"?: string;
  prompt?: string;
  tone?: "friendly" | "professional" | "casual" | "formal";
  actions?: any[];
  variables?: any[];
}) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: agentsServiceBaseURL,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Create agent error:", error);
    throw error;
  }
};

// Update agent
export const updateAgentService = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    type?: string;
    status?: string;
    "agent-type"?: "voice" | "text" | "both";
    voice?: "calm" | "happy" | "professional" | "friendly";
    language?: "Farsi" | "Arabic" | "English" | "Azari" | "Kurdi";
    "ambient-sound"?: boolean | "coffee shop" | "office" | "nature" | "silence";
    "company-info"?: string;
    "agent-objective"?: string;
    "agent-purpose"?:
      | "customer-service"
      | "receptionist"
      | "sales"
      | "support"
      | "general";
    "custom-greeting"?: string;
    prompt?: string;
    tone?: "friendly" | "professional" | "casual" | "formal";
    actions?: any[];
    variables?: any[];
  }
) => {
  try {
    const response = await api({
      method: axiosMethods.put,
      url: `${agentsServiceBaseURL}/${id}`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Update agent error:", error);
    throw error;
  }
};

// Delete agent
export const deleteAgentService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.delete,
      url: `${agentsServiceBaseURL}/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Delete agent error:", error);
    throw error;
  }
};
