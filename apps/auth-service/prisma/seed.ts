import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: "orbitan" },
    update: {},
    create: {
      name: "Orbitan",
      slug: "orbitan",
      plan: "ENTERPRISE",
      settings: {
        timezone: "America/Sao_Paulo",
        locale: "pt-BR",
        whatsappLimit: 50,
        storageLimitBytes: 10737418240,
      },
      features: {
        ai: true,
        analytics: true,
        automation: true,
        finance: true,
        infra: true,
        plugins: true,
      },
    },
  });

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@orbitan.com.br" },
    update: {},
    create: {
      tenantId: tenant.id,
      email: "admin@orbitan.com.br",
      name: "Admin Orbitan",
      password: hashedPassword,
      role: "OWNER",
      isActive: true,
    },
  });

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
