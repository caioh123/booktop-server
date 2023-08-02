import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Executa as migrações do Prisma no banco de dados de teste
  await prisma.$connect();

  // Redefine o banco de dados de teste antes de cada teste
});

afterAll(async () => {
  // Fecha a conexão do Prisma e limpa o banco de dados de teste
  await prisma.$disconnect();
});
