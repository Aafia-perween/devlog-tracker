import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const logs = await prisma.log.findMany();
  return Response.json(logs);
}

export async function POST(req: Request) {
  const body = await req.json();

  const log = await prisma.log.create({
    data: {
      topic: body.topic,
      notes: body.notes,
    },
  });

  return Response.json(log);
}

export async function DELETE(req: Request) {
  const body = await req.json();

  await prisma.log.delete({
    where: { id: body.id },
  });

  return Response.json({ message: "deleted" });
}