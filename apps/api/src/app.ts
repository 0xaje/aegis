import fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function buildApp() {
  const app = fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: '*',
  });

  // Health check endpoint verifying database connectivity
  app.get('/health', async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return { status: 'OK', database: 'CONNECTED' };
    } catch (error) {
      app.log.error({ err: error }, 'Database connection failed');
      return { status: 'DEGRADED', database: 'DISCONNECTED', error: String(error) };
    }
  });

  return app;
}
