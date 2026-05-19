import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class ChargeService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.charge.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  }

  async get(id: string) {
    const charge = await this.prisma.charge.findUnique({ where: { id } });
    if (!charge) throw new NotFoundException("Charge not found");
    return charge;
  }

  async create(data: { tenantId: string; customerId: string; amount: number; description: string; method: string; dueDate: string }) {
    return this.prisma.charge.create({
      data: {
        tenantId: data.tenantId,
        customerId: data.customerId,
        amount: data.amount,
        description: data.description,
        method: data.method,
        dueDate: new Date(data.dueDate),
      },
    });
  }
}
