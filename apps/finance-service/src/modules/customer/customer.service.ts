import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.customer.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  }

  async create(data: { tenantId: string; name: string; email?: string; phone?: string; document?: string }) {
    return this.prisma.customer.create({ data });
  }
}
