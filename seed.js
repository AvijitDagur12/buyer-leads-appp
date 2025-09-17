import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Lead 1
  const lead1 = await prisma.lead.create({
    data: {
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "9876543210",
      budgetRange: "50k-70k",
      locationPref: "City Center",
      propertyType: "Apartment",
      status: "NEW",
      user: { connect: { id: 1 } },
    },
  });

  await prisma.leadHistory.createMany({
    data: [
      { leadId: lead1.id, status: "NEW", comment: "Initial lead created" },
      { leadId: lead1.id, status: "CONTACTED", comment: "Called the client" },
      { leadId: lead1.id, status: "INTERESTED", comment: "Client showed interest" },
    ],
  });

  // Lead 2
  const lead2 = await prisma.lead.create({
    data: {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "9876543211",
      budgetRange: "30k-50k",
      locationPref: "Uptown",
      propertyType: "Flat",
      status: "NEW",
      user: { connect: { id: 2 } },
    },
  });

  await prisma.leadHistory.createMany({
    data: [
      { leadId: lead2.id, status: "NEW", comment: "Initial lead created" },
      { leadId: lead2.id, status: "CONTACTED", comment: "Sent an email" },
    ],
  });

  console.log("Database seeded with leads and multiple history entries!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
