import { api } from "@/api";
import { axiosMethods } from "@/shared/constants/axiosMethods";
import { apiVersion1 } from "@/api/config";

const knowledgeBaseServiceBaseURL = `${apiVersion1}/knowledge-base`;

// Knowledge Base Management
export const getKnowledgeBasesService = async () => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: knowledgeBaseServiceBaseURL,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Get knowledge bases error:", error);
    throw error;
  }
};

export const getKnowledgeBaseByIdService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${knowledgeBaseServiceBaseURL}/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Get knowledge base by ID error:", error);
    throw error;
  }
};

export const createKnowledgeBaseService = async (data: {
  title: string;
  description?: string;
  type?: string;
}) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: knowledgeBaseServiceBaseURL,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Create knowledge base error:", error);
    throw error;
  }
};

export const updateKnowledgeBaseService = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    type?: string;
  }
) => {
  try {
    const response = await api({
      method: axiosMethods.put,
      url: `${knowledgeBaseServiceBaseURL}/${id}`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Update knowledge base error:", error);
    throw error;
  }
};

export const deleteKnowledgeBaseService = async (id: string) => {
  try {
    const response = await api({
      method: axiosMethods.delete,
      url: `${knowledgeBaseServiceBaseURL}/${id}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Delete knowledge base error:", error);
    throw error;
  }
};

// Knowledge Base Data Management
export const getKnowledgeBaseDataService = async (
  knowledgeBaseId: string,
  search?: string
) => {
  try {
    const response = await api({
      method: axiosMethods.get,
      url: `${knowledgeBaseServiceBaseURL}/${knowledgeBaseId}/data`,
      params: search ? { search } : {},
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Get knowledge base data error:", error);
    throw error;
  }
};

export const addKnowledgeBaseDataService = async (
  knowledgeBaseId: string,
  data: {
    type: string;
    title: string;
    content?: string;
    url?: string;
    youtubeUrl?: string;
    wordpressUrl?: string;
    apiUrl?: string;
  }
) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${knowledgeBaseServiceBaseURL}/${knowledgeBaseId}/data`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Add knowledge base data error:", error);
    throw error;
  }
};

export const updateKnowledgeBaseDataService = async (
  knowledgeBaseId: string,
  dataId: string,
  data: {
    title?: string;
    content?: string;
    url?: string;
  }
) => {
  try {
    const response = await api({
      method: axiosMethods.put,
      url: `${knowledgeBaseServiceBaseURL}/${knowledgeBaseId}/data/${dataId}`,
      data: data,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Update knowledge base data error:", error);
    throw error;
  }
};

export const deleteKnowledgeBaseDataService = async (
  knowledgeBaseId: string,
  dataId: string
) => {
  try {
    const response = await api({
      method: axiosMethods.delete,
      url: `${knowledgeBaseServiceBaseURL}/${knowledgeBaseId}/data/${dataId}`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Delete knowledge base data error:", error);
    throw error;
  }
};

export const syncKnowledgeBaseDataService = async (
  knowledgeBaseId: string,
  dataId: string
) => {
  try {
    const response = await api({
      method: axiosMethods.post,
      url: `${knowledgeBaseServiceBaseURL}/${knowledgeBaseId}/data/${dataId}/sync`,
      isAuthorizationNeeded: true,
    });
    return response;
  } catch (error) {
    console.error("Sync knowledge base data error:", error);
    throw error;
  }
};
