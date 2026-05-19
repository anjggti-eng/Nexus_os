import { Controller, Get, Query } from "@nestjs/common";

@Controller()
export class AnalyticsController {
  @Get("dashboard")
  async dashboard(@Query() query: { tenantId?: string }) {
    return {
      messagesToday: 0,
      activeSessions: 0,
      commandsExecuted: 0,
      revenueToday: 0,
      alertsActive: 0,
    };
  }

  @Get("metrics")
  async metrics(@Query() query: any) {
    return { commands: [], messages: [], sessions: [] };
  }

  @Get("reports")
  async reports(@Query() query: any) {
    return { reports: [] };
  }
}
