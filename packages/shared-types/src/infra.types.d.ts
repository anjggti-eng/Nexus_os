export declare enum ContainerStatus {
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
    RESTARTING = "RESTARTING",
    PAUSED = "PAUSED",
    ERROR = "ERROR"
}
export interface Container {
    id: string;
    name: string;
    image: string;
    status: ContainerStatus;
    ports: string[];
    cpu: number;
    memory: number;
    startedAt: string;
}
export interface Server {
    id: string;
    hostname: string;
    ip: string;
    provider: string;
    region?: string;
    cpu: number;
    ramGb: number;
    diskGb: number;
    os: string;
    status: "ONLINE" | "OFFLINE" | "MAINTENANCE";
}
export interface Deployment {
    id: string;
    service: string;
    version: string;
    status: "DEPLOYING" | "HEALTHY" | "FAILED" | "ROLLING_BACK";
    commitSha?: string;
    branch?: string;
    logs: string[];
    startedAt: string;
    completedAt?: string;
}
export interface ProxmoxVM {
    vmid: number;
    name: string;
    node: string;
    status: "running" | "stopped";
    cpu: number;
    memory: {
        used: number;
        total: number;
    };
    disk: {
        used: number;
        total: number;
    };
    uptime: number;
}
export interface SshCommand {
    host: string;
    command: string;
    output: string;
    exitCode: number;
    durationMs: number;
}
//# sourceMappingURL=infra.types.d.ts.map