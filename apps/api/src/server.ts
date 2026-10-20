import { createApp } from './app';
import { env } from './config/env';
import { connectDb, disconnectDb } from './database/connection';

const app = createApp();

const server = app.listen(env.PORT, async () => {
  console.info(`=======================================================`);
  console.info(` WanderSphere API Service`);
  console.info(` Port:        ${env.PORT}`);
  console.info(` Environment: ${env.NODE_ENV}`);
  console.info(` Health:      http://localhost:${env.PORT}/api/v1/health`);
  console.info(`=======================================================`);

  // Connect to MongoDB if configured
  await connectDb();
});

// Graceful shutdown handling
let isShuttingDown = false;

async function handleShutdown(signal: string) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.info(`\nReceived ${signal}. Starting graceful shutdown...`);

  // Force shutdown after 10 seconds if graceful shutdown hangs
  const forceShutdownTimer = setTimeout(() => {
    console.error('Forced shutdown timeout exceeded. Terminating process immediately.');
    process.exit(1);
  }, 10000);
  forceShutdownTimer.unref();

  server.close(async (err) => {
    if (err) {
      console.error('Error during HTTP server close:', err);
    } else {
      console.info('HTTP server closed successfully.');
    }

    await disconnectDb();
    console.info('Graceful shutdown completed.');
    process.exit(0);
  });
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
