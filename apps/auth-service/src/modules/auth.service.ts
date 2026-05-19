import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { randomUUID as uuid } from "crypto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(
    email: string,
    password: string,
    tenantId: string,
    ip: string,
    userAgent?: string
  ) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { tenant: true },
    });

    if (!user || user.tenantId !== tenantId) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!user.isActive) {
      throw new UnauthorizedException("User is inactive");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const tokens = await this.generateTokens(user.id, user.tenantId, user.role, user.email);

    await this.prisma.deviceSession.create({
      data: {
        userId: user.id,
        token: tokens.refreshToken,
        ip,
        userAgent,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    await this.createAuditLog(user.id, user.tenantId, "LOGIN", "auth", ip, userAgent);

    return {
      user: {
        id: user.id,
        tenantId: user.tenantId,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        isActive: user.isActive,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      tokens,
    };
  }

  async refresh(refreshToken: string) {
    const session = await this.prisma.deviceSession.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!session || !session.isActive || session.expiresAt < new Date()) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    const tokens = await this.generateTokens(
      session.user.id,
      session.user.tenantId,
      session.user.role,
      session.user.email
    );

    await this.prisma.deviceSession.update({
      where: { id: session.id },
      data: { token: tokens.refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    });

    return tokens;
  }

  async logout(refreshToken: string) {
    await this.prisma.deviceSession.updateMany({
      where: { token: refreshToken },
      data: { isActive: false },
    });
  }

  private async generateTokens(userId: string, tenantId: string, role: string, email: string) {
    const payload = { sub: userId, tenantId, role, email };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = uuid();

    return {
      accessToken,
      refreshToken,
      expiresIn: 900,
    };
  }

  private async createAuditLog(
    userId: string,
    tenantId: string,
    action: string,
    resource: string,
    ip: string,
    userAgent?: string
  ) {
    await this.prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action,
        resource,
        ip,
        userAgent,
        result: "SUCCESS",
      },
    });
  }
}
