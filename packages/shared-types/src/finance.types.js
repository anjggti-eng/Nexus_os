"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = exports.ChargeStatus = void 0;
var ChargeStatus;
(function (ChargeStatus) {
    ChargeStatus["PENDING"] = "PENDING";
    ChargeStatus["PAID"] = "PAID";
    ChargeStatus["OVERDUE"] = "OVERDUE";
    ChargeStatus["CANCELLED"] = "CANCELLED";
    ChargeStatus["REFUNDED"] = "REFUNDED";
})(ChargeStatus || (exports.ChargeStatus = ChargeStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["PIX"] = "PIX";
    PaymentMethod["BOLETO"] = "BOLETO";
    PaymentMethod["CREDIT_CARD"] = "CREDIT_CARD";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
//# sourceMappingURL=finance.types.js.map