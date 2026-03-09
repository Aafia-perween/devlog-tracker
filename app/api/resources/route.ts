import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const resources = await prisma.resource.findMany();
  return Response.json(resources);
}

export async function POST(req: Request) {
  const body = await req.json();

  const resource = await prisma.resource.create({
    data: {
      title: body.title,
      link: body.link,
    },
  });

  return Response.json(resource);
}

export async function DELETE(req: Request) {
  const body = await req.json();

  await prisma.resource.delete({
    where: { id: body.id },
  });

  return Response.json({ message: "deleted" });
}