import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Headers,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { email: string; password: string; tenantId: string },
    @Headers("user-agent") userAgent?: string,
    @Headers("x-forwarded-for") ip?: string
  ) {
    const result = await this.authService.login(
      body.email,
      body.password,
      body.tenantId,
      ip || "unknown",
      userAgent
    );
    return result;
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body.refreshToken);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Body() body: { refreshToken: string }) {
    await this.authService.logout(body.refreshToken);
    return { message: "Logged out" };
  }
}
