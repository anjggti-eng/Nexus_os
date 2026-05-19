export enum WorkflowTriggerType {
  MESSAGE = "MESSAGE",
  COMMAND = "COMMAND",
  SCHEDULE = "SCHEDULE",
  WEBHOOK = "WEBHOOK",
  EVENT = "EVENT",
  CONDITION = "CONDITION",
}

export enum WorkflowStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ERROR = "ERROR",
}

export interface Workflow {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  trigger: WorkflowTrigger;
  actions: WorkflowAction[];
  status: WorkflowStatus;
  executionCount: number;
  lastExecutedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowTrigger {
  type: WorkflowTriggerType;
  config: Record<string, unknown>;
}

export interface WorkflowAction {
  id: string;
  type: string;
  config: Record<string, unknown>;
  order: number;
  dependsOn?: string[];
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  tenantId: string;
  trigger: WorkflowTriggerType;
  status: "RUNNING" | "SUCCESS" | "FAILURE";
  input: unknown;
  output?: unknown;
  error?: string;
  startedAt: string;
  completedAt?: string;
}

export interface WorkflowLog {
  id: string;
  executionId: string;
  actionId: string;
  status: "PENDING" | "RUNNING" | "SUCCESS" | "FAILURE";
  input?: unknown;
  output?: unknown;
  error?: string;
  durationMs?: number;
  timestamp: string;
}
