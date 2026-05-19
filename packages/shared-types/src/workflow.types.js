"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowStatus = exports.WorkflowTriggerType = void 0;
var WorkflowTriggerType;
(function (WorkflowTriggerType) {
    WorkflowTriggerType["MESSAGE"] = "MESSAGE";
    WorkflowTriggerType["COMMAND"] = "COMMAND";
    WorkflowTriggerType["SCHEDULE"] = "SCHEDULE";
    WorkflowTriggerType["WEBHOOK"] = "WEBHOOK";
    WorkflowTriggerType["EVENT"] = "EVENT";
    WorkflowTriggerType["CONDITION"] = "CONDITION";
})(WorkflowTriggerType || (exports.WorkflowTriggerType = WorkflowTriggerType = {}));
var WorkflowStatus;
(function (WorkflowStatus) {
    WorkflowStatus["ACTIVE"] = "ACTIVE";
    WorkflowStatus["INACTIVE"] = "INACTIVE";
    WorkflowStatus["ERROR"] = "ERROR";
})(WorkflowStatus || (exports.WorkflowStatus = WorkflowStatus = {}));
//# sourceMappingURL=workflow.types.js.map