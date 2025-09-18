export interface KnowledgeBaseModel {
  id: string;
  name: string;
  type: string;
  dataCount: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeBaseDataModel {
  id: string;
  knowledge_base_id: string;
  title: string;
  type: string;
  status: "completed" | "pending" | "failed";
  syncTime: string;
  characterCount: number;
  url?: string;
  notifications?: number;
  content?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateKnowledgeBaseModel {
  title: string;
  description?: string;
  type?: string;
}

export interface UpdateKnowledgeBaseModel {
  title?: string;
  description?: string;
  type?: string;
}

export interface AddKnowledgeBaseDataModel {
  type: string;
  title: string;
  content?: string;
  url?: string;
  youtubeUrl?: string;
  wordpressUrl?: string;
  apiUrl?: string;
}

export interface UpdateKnowledgeBaseDataModel {
  title?: string;
  content?: string;
  url?: string;
}

export interface KnowledgeBaseResponseModel {
  success: boolean;
  data?: KnowledgeBaseModel;
  message?: string;
  error?: string;
}

export interface KnowledgeBaseListResponseModel {
  success: boolean;
  data?: KnowledgeBaseModel[];
  total?: number;
  error?: string;
}

export interface KnowledgeBaseDataResponseModel {
  success: boolean;
  data?: KnowledgeBaseDataModel;
  message?: string;
  error?: string;
}

export interface KnowledgeBaseDataListResponseModel {
  success: boolean;
  data?: KnowledgeBaseDataModel[];
  total?: number;
  error?: string;
}
