import { buildApp } from './app.js';
import { env } from './config.js';

async function start() {
  try {
    const server = await buildApp();
    const address = await server.listen({
      port: env.PORT,
      host: env.HOST,
    });
    server.log.info(`Aegis API Server successfully listening on ${address}`);
  } catch (err) {
    console.error('Critical error during API server boot:', err);
    process.exit(1);
  }
}

start();
