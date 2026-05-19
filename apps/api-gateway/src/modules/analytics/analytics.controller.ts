import { Controller, Get, Query } from "@nestjs/common";

@Controller()
export class AnalyticsController {
  @Get("dashboard")
  async getDashboard(@Query() query: any) {
    return { message: "proxied to analytics-service" };
  }

  @Get("reports")
  async getReports(@Query() query: any) {
    return { message: "proxied to analytics-service" };
  }

  @Get("metrics")
  async getMetrics(@Query() query: any) {
    return { message: "proxied to analytics-service" };
  }
}
