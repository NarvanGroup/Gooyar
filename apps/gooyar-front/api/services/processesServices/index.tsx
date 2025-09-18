import { api } from "@/api";
import { axiosMethods } from "@/shared/constants/axiosMethods";
import { apiVersion1 } from "@/api/config";

const processesServiceBaseURL = `${apiVersion1}/processes`;

// Get all processes
export const getProcessesService = async () => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: processesServiceBaseURL,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Get processes error:", error);
    throw error;
  }
};

// Get process by ID
export const getProcessByIdService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${processesServiceBaseURL}/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Get process by ID error:", error);
    throw error;
  }
};

// Create new process
export const createProcessService = async (data: {
  name: string;
  agent?: string;
  contactPoints?: string[];
  knowledgeBases?: string[];
  status?: string;
}) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: processesServiceBaseURL,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Create process error:", error);
    throw error;
  }
};

// Update process
export const updateProcessService = async (
  id: string,
  data: {
    name?: string;
    agent?: string;
    contactPoints?: string[];
    knowledgeBases?: string[];
    status?: string;
  }
) => {
  try {
    const response = await api({
      method: axiosMethods.put,
      url: `${processesServiceBaseURL}/${id}`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Update process error:", error);
    throw error;
  }
};

// Delete process
export const deleteProcessService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.delete,
      url: `${processesServiceBaseURL}/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Delete process error:", error);
    throw error;
  }
};

// Toggle process status
export const toggleProcessStatusService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.patch,
      url: `${processesServiceBaseURL}/${id}/toggle-status`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Toggle process status error:", error);
    throw error;
  }
};

// Get process statistics
export const getProcessStatsService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${processesServiceBaseURL}/${id}/stats`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Get process stats error:", error);
    throw error;
  }
};
