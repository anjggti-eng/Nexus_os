import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";

@Controller()
export class AuthController {
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string; tenantId: string }) {
    return { message: "proxied to auth-service" };
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: { refreshToken: string }) {
    return { message: "proxied to auth-service" };
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Body() body: { refreshToken: string }) {
    return { message: "proxied to auth-service" };
  }
}
