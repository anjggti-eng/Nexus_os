export enum UserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  OPERATOR = "OPERATOR",
  FINANCIAL = "FINANCIAL",
  SUPPORT = "SUPPORT",
}

export interface UserProfile {
  id: string;
  tenantId: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  tenantId: string;
}

export interface LoginResponse {
  user: UserProfile;
  tokens: AuthTokens;
}

export interface AuditEntry {
  id: string;
  tenantId: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ip: string;
  userAgent?: string;
  result: "SUCCESS" | "FAILURE";
  createdAt: string;
}
