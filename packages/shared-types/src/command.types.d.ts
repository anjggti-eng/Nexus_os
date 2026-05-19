export declare enum CommandModule {
    INFRA = "infra",
    WHATSAPP = "whatsapp",
    FINANCE = "finance",
    WORKFLOW = "workflow",
    ANALYTICS = "analytics",
    AI = "ai",
    SYSTEM = "system"
}
export interface ParsedCommand {
    raw: string;
    module: CommandModule;
    action: string;
    args: Record<string, string>;
    target?: string;
    confidence: number;
}
export interface CommandIntent {
    id: string;
    module: CommandModule;
    patterns: string[];
    action: string;
    params: CommandParam[];
    description: string;
}
export interface CommandParam {
    name: string;
    type: "string" | "number" | "boolean" | "enum";
    required: boolean;
    enum?: string[];
    description?: string;
}
export interface CommandResult {
    success: boolean;
    message: string;
    data?: unknown;
    executionTimeMs: number;
    actionLog: string[];
}
export interface CommandSuggestion {
    module: CommandModule;
    action: string;
    description: string;
    confidence: number;
}
//# sourceMappingURL=command.types.d.ts.map