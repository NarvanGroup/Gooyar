export interface AgentAction {
  type:
    | "send-sms"
    | "webhook"
    | "schedule"
    | "send-email"
    | "send-notification"
    | "end-convo";
  url?: string;
  "notification-type"?: string;
}

export interface AgentVariable {
  title: string;
  value: string;
  id: string;
}

export interface AgentModel {
  id: string;
  name: string;
  description?: string;
  type: string;
  status: "active" | "inactive";
  "agent-type": "voice" | "text" | "both";
  voice?: "calm" | "happy" | "professional" | "friendly";
  language: "Farsi" | "Arabic" | "English" | "Azari" | "Kurdi";
  "ambient-sound": boolean | "coffee shop" | "office" | "nature" | "silence";
  "company-info": string;
  "agent-objective": string;
  "agent-purpose":
    | "customer-service"
    | "receptionist"
    | "sales"
    | "support"
    | "general";
  "custom-greeting": string;
  prompt: string;
  tone: "friendly" | "professional" | "casual" | "formal";
  actions: AgentAction[];
  variables: AgentVariable[];
  created_at: string;
  updated_at: string;
}

export interface CreateAgentModel {
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
  actions?: AgentAction[];
  variables?: AgentVariable[];
}

export interface UpdateAgentModel {
  name?: string;
  description?: string;
  type?: string;
  status?: "active" | "inactive";
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
  actions?: AgentAction[];
  variables?: AgentVariable[];
}

export interface AgentResponseModel {
  success: boolean;
  data?: AgentModel;
  message?: string;
  error?: string;
}

export interface AgentsListResponseModel {
  success: boolean;
  data?: AgentModel[];
  total?: number;
  error?: string;
}
