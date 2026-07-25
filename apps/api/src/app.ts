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

  // API router grouping
  await app.register(
    async (api) => {
      // Fetch portfolio
      api.get('/portfolio/:address', async (req, reply) => {
        const { address } = req.params as { address: string };
        return reply.send({
          userId: 'stub-user-123',
          address,
          assets: [
            {
              symbol: 'FLR',
              name: 'Flare',
              address: '0x0000000000000000000000000000000000000000',
              decimals: 18,
              balance: '2500000000000000000000', // 2500 FLR
              valueUSD: 75.0,
              priceUSD: 0.03,
            },
            {
              symbol: 'WFLR',
              name: 'Wrapped Flare',
              address: '0x1D8F7CA53789d4BBa65a9530de7bd0709d005fE4',
              decimals: 18,
              balance: '15000000000000000000000', // 15000 WFLR
              valueUSD: 450.0,
              priceUSD: 0.03,
            },
          ],
          totalValueUSD: 525.0,
          updatedAt: new Date().toISOString(),
        });
      });

      // Fetch investment strategies
      api.get('/strategies', async (_req, reply) => {
        return reply.send([
          {
            id: 'strat-low-ftso',
            name: 'FTSO Delegation Optimizer',
            riskTolerance: 'LOW',
            allocation: [{ symbol: 'WFLR', percentage: 100 }],
            description:
              'Auto-allocates wrapped Flare to best-performing FTSO providers inside a secure enclave.',
          },
          {
            id: 'strat-med-growth',
            name: 'Balanced Yield strategy',
            riskTolerance: 'MEDIUM',
            allocation: [
              { symbol: 'WFLR', percentage: 70 },
              { symbol: 'USDT', percentage: 30 },
            ],
            description:
              'Maintains balanced allocation targeting medium yield with low stablecoin hedge.',
          },
        ]);
      });

      // Fetch AI strategy recommendations
      api.get('/recommendations/:address', async (req, reply) => {
        const { address } = req.params as { address: string };
        return reply.send({
          id: 'rec-abc-987',
          strategyId: 'strat-low-ftso',
          rationale: `Portfolio at address ${address} shows un-delegated WFLR holdings. Delegating via Flare FTSOv2 offers 8.5% historical risk-free APY.`,
          simulatedReturn: 0.085,
          confidenceScore: 0.98,
          verifiedByConfidentialCompute: true,
          signature: '0xae631ffbaee231...cef712',
          timestamp: new Date().toISOString(),
        });
      });
    },
    { prefix: '/api' },
  );

  return app;
}
