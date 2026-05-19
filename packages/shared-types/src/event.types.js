"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NexusEvent = void 0;
var NexusEvent;
(function (NexusEvent) {
    // Auth
    NexusEvent["USER_LOGIN"] = "auth.user.login";
    NexusEvent["USER_LOGOUT"] = "auth.user.logout";
    NexusEvent["USER_CREATED"] = "auth.user.created";
    // WhatsApp
    NexusEvent["WHATSAPP_SESSION_CREATED"] = "whatsapp.session.created";
    NexusEvent["WHATSAPP_SESSION_CONNECTED"] = "whatsapp.session.connected";
    NexusEvent["WHATSAPP_SESSION_DISCONNECTED"] = "whatsapp.session.disconnected";
    NexusEvent["WHATSAPP_MESSAGE_RECEIVED"] = "whatsapp.message.received";
    NexusEvent["WHATSAPP_MESSAGE_SENT"] = "whatsapp.message.sent";
    NexusEvent["WHATSAPP_QR_CODE"] = "whatsapp.qr.code";
    // Command
    NexusEvent["COMMAND_RECEIVED"] = "command.received";
    NexusEvent["COMMAND_PARSED"] = "command.parsed";
    NexusEvent["COMMAND_EXECUTED"] = "command.executed";
    // Workflow
    NexusEvent["WORKFLOW_STARTED"] = "workflow.started";
    NexusEvent["WORKFLOW_COMPLETED"] = "workflow.completed";
    NexusEvent["WORKFLOW_FAILED"] = "workflow.failed";
    NexusEvent["WORKFLOW_TRIGGERED"] = "workflow.triggered";
    // Infra
    NexusEvent["INFRA_CONTAINER_STARTED"] = "infra.container.started";
    NexusEvent["INFRA_CONTAINER_STOPPED"] = "infra.container.stopped";
    NexusEvent["INFRA_DEPLOY_STARTED"] = "infra.deploy.started";
    NexusEvent["INFRA_DEPLOY_COMPLETED"] = "infra.deploy.completed";
    NexusEvent["INFRA_DEPLOY_FAILED"] = "infra.deploy.failed";
    NexusEvent["INFRA_ALERT"] = "infra.alert";
    // Finance
    NexusEvent["FINANCE_CHARGE_CREATED"] = "finance.charge.created";
    NexusEvent["FINANCE_CHARGE_PAID"] = "finance.charge.paid";
    NexusEvent["FINANCE_CHARGE_OVERDUE"] = "finance.charge.overdue";
    NexusEvent["FINANCE_PIX_RECEIVED"] = "finance.pix.received";
    // Analytics
    NexusEvent["ANALYTICS_METRIC_RECORDED"] = "analytics.metric.recorded";
    NexusEvent["ANALYTICS_REPORT_GENERATED"] = "analytics.report.generated";
    // AI
    NexusEvent["AI_INTENT_DETECTED"] = "ai.intent.detected";
    NexusEvent["AI_SUGGESTION_GENERATED"] = "ai.suggestion.generated";
    NexusEvent["AI_MEMORY_UPDATED"] = "ai.memory.updated";
    // System
    NexusEvent["SYSTEM_ERROR"] = "system.error";
    NexusEvent["SYSTEM_HEALTH"] = "system.health";
})(NexusEvent || (exports.NexusEvent = NexusEvent = {}));
//# sourceMappingURL=event.types.js.map