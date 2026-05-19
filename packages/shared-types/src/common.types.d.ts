export interface PaginationParams {
    page: number;
    limit: number;
}
export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    meta?: Record<string, unknown>;
}
export declare enum TenantStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED"
}
export declare enum PlanType {
    STARTER = "STARTER",
    BUSINESS = "BUSINESS",
    ENTERPRISE = "ENTERPRISE"
}
//# sourceMappingURL=common.types.d.ts.map