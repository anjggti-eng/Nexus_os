export enum ChargeStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
  PIX = "PIX",
  BOLETO = "BOLETO",
  CREDIT_CARD = "CREDIT_CARD",
}

export interface Charge {
  id: string;
  tenantId: string;
  customerId: string;
  amount: number;
  description: string;
  method: PaymentMethod;
  status: ChargeStatus;
  pixCode?: string;
  pixQrCode?: string;
  boletoUrl?: string;
  boletoBarCode?: string;
  dueDate: string;
  paidAt?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Customer {
  id: string;
  tenantId: string;
  name: string;
  email?: string;
  phone?: string;
  document?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface PixTransaction {
  id: string;
  chargeId?: string;
  amount: number;
  description: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  qrCode?: string;
  payload?: string;
  paidAt?: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  tenantId: string;
  customerId: string;
  plan: string;
  amount: number;
  status: "ACTIVE" | "CANCELLED" | "EXPIRED";
  nextBilling: string;
  createdAt: string;
}
