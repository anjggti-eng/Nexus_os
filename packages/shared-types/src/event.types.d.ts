export declare enum NexusEvent {
    USER_LOGIN = "auth.user.login",
    USER_LOGOUT = "auth.user.logout",
    USER_CREATED = "auth.user.created",
    WHATSAPP_SESSION_CREATED = "whatsapp.session.created",
    WHATSAPP_SESSION_CONNECTED = "whatsapp.session.connected",
    WHATSAPP_SESSION_DISCONNECTED = "whatsapp.session.disconnected",
    WHATSAPP_MESSAGE_RECEIVED = "whatsapp.message.received",
    WHATSAPP_MESSAGE_SENT = "whatsapp.message.sent",
    WHATSAPP_QR_CODE = "whatsapp.qr.code",
    COMMAND_RECEIVED = "command.received",
    COMMAND_PARSED = "command.parsed",
    COMMAND_EXECUTED = "command.executed",
    WORKFLOW_STARTED = "workflow.started",
    WORKFLOW_COMPLETED = "workflow.completed",
    WORKFLOW_FAILED = "workflow.failed",
    WORKFLOW_TRIGGERED = "workflow.triggered",
    INFRA_CONTAINER_STARTED = "infra.container.started",
    INFRA_CONTAINER_STOPPED = "infra.container.stopped",
    INFRA_DEPLOY_STARTED = "infra.deploy.started",
    INFRA_DEPLOY_COMPLETED = "infra.deploy.completed",
    INFRA_DEPLOY_FAILED = "infra.deploy.failed",
    INFRA_ALERT = "infra.alert",
    FINANCE_CHARGE_CREATED = "finance.charge.created",
    FINANCE_CHARGE_PAID = "finance.charge.paid",
    FINANCE_CHARGE_OVERDUE = "finance.charge.overdue",
    FINANCE_PIX_RECEIVED = "finance.pix.received",
    ANALYTICS_METRIC_RECORDED = "analytics.metric.recorded",
    ANALYTICS_REPORT_GENERATED = "analytics.report.generated",
    AI_INTENT_DETECTED = "ai.intent.detected",
    AI_SUGGESTION_GENERATED = "ai.suggestion.generated",
    AI_MEMORY_UPDATED = "ai.memory.updated",
    SYSTEM_ERROR = "system.error",
    SYSTEM_HEALTH = "system.health"
}
export interface EventPayload {
    event: NexusEvent;
    tenantId: string;
    source: string;
    timestamp: number;
    correlationId: string;
    data: Record<string, unknown>;
}
//# sourceMappingURL=event.types.d.ts.map