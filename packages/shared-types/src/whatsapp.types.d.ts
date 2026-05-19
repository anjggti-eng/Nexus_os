export declare enum SessionStatus {
    CONNECTING = "CONNECTING",
    SCANNING = "SCANNING",
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED",
    TIMEOUT = "TIMEOUT",
    ERROR = "ERROR"
}
export interface WhatsAppSession {
    id: string;
    tenantId: string;
    name: string;
    number?: string;
    status: SessionStatus;
    qrCode?: string;
    webhookUrl?: string;
    settings: SessionSettings;
    createdAt: string;
    updatedAt: string;
}
export interface SessionSettings {
    autoReconnect: boolean;
    readReceipts: boolean;
    presenceTracking: boolean;
    messageRetentionDays: number;
}
export interface MessageReceived {
    sessionId: string;
    tenantId: string;
    from: string;
    body: string;
    timestamp: number;
    messageType: string;
    mediaUrl?: string;
}
export interface SendMessageRequest {
    sessionId: string;
    to: string;
    text?: string;
    media?: string;
    caption?: string;
}
export interface MessageStatus {
    messageId: string;
    sessionId: string;
    status: "SENT" | "DELIVERED" | "READ" | "FAILED";
    timestamp: number;
}
export interface ChatContact {
    jid: string;
    name?: string;
    pushName?: string;
    number: string;
    isGroup: boolean;
    profilePicUrl?: string;
}
//# sourceMappingURL=whatsapp.types.d.ts.map