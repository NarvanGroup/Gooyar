export interface ProcessModel {
  id: string;
  name: string;
  agent: string;
  contactPoints: string[];
  knowledgeBases: string[];
  status: "فعال" | "غیرفعال";
  createdAt: string;
  lastActivity: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProcessModel {
  name: string;
  agent?: string;
  contactPoints?: string[];
  knowledgeBases?: string[];
  status?: string;
}

export interface UpdateProcessModel {
  name?: string;
  agent?: string;
  contactPoints?: string[];
  knowledgeBases?: string[];
  status?: string;
}

export interface ProcessStatsModel {
  totalConversations: number;
  activeConversations: number;
  totalMessages: number;
  averageResponseTime: number; // seconds
  satisfactionRate: number; // percentage
}

export interface ProcessResponseModel {
  success: boolean;
  data?: ProcessModel;
  message?: string;
  error?: string;
}

export interface ProcessListResponseModel {
  success: boolean;
  data?: ProcessModel[];
  total?: number;
  error?: string;
}

export interface ProcessStatsResponseModel {
  success: boolean;
  data?: ProcessStatsModel;
  error?: string;
}
