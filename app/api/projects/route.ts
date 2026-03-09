import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const projects = await prisma.project.findMany();
  return Response.json(projects);
}

export async function POST(req: Request) {
  const body = await req.json();

  const project = await prisma.project.create({
    data: {
      name: body.name,
    },
  });

  return Response.json(project);
}

export async function DELETE(req: Request) {
  const body = await req.json();

  await prisma.project.delete({
    where: { id: body.id },
  });

  return Response.json({ message: "deleted" });
}