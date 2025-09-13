export interface Process {
  id: string;
  name: string;
  agent: string;
  contactPoints: string[];
  knowledgeBases: string[];
  status: "فعال" | "غیرفعال";
  createdAt: string;
  lastActivity: string;
}

export interface ProcessData {
  agentId: string;
  contactPointIds: string[];
  knowledgeBaseIds: string[];
  calendarId: string | null;
  aiConfig: {
    promptTemplate: string;
    tone: "friendly" | "formal" | "casual";
    maxTokens: number;
  };
  name?: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
}

export interface ContactPoint {
  id: string;
  type: "phone" | "whatsapp" | "telegram" | "email";
  value: string;
  name?: string;
}

export interface KnowledgeBase {
  id: string;
  name: string;
  size: string;
  type?: string;
}

export interface Calendar {
  id: string;
  provider: string;
  connected: boolean;
  name?: string;
}
