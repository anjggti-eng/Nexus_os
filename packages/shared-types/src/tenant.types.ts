import { PlanType, TenantStatus } from "./common.types";

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: PlanType;
  status: TenantStatus;
  settings: TenantSettings;
  features: TenantFeatures;
  createdAt: string;
  updatedAt: string;
}

export interface TenantSettings {
  timezone: string;
  locale: string;
  whatsappLimit: number;
  storageLimitBytes: number;
  customDomain?: string;
  webhookUrl?: string;
}

export interface TenantFeatures {
  ai: boolean;
  analytics: boolean;
  automation: boolean;
  finance: boolean;
  infra: boolean;
  plugins: boolean;
}
