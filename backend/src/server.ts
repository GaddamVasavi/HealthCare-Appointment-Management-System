import app from './app';
import connectDatabase from './config/database';
import config, { validateConfig } from './config';
import { logger } from './utils/logger';

const startServer = async (): Promise<void> => {
  validateConfig();
  await connectDatabase();
  app.listen(config.port, () => {
    logger.info(`MediCare Connect API listening on port ${config.port}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    logger.error(`Unable to start server: ${error}`);
    process.exit(1);
  });
}

export { startServer };