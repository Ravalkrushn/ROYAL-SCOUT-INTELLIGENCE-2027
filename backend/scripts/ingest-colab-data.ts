import { connectDatabase, disconnectDatabase } from '../src/config/database.js';
import { DataImportService } from '../src/services/dataImportService.js';
import { logger } from '../src/utils/logger.js';

async function main() {
  logger.info('--- RUNNING STANDALONE DATA INGESTION PIPELINE ---');
  await connectDatabase();
  const summary = await DataImportService.runImport();
  console.log('\n--- INGESTION SUMMARY ---');
  console.log(JSON.stringify(summary, null, 2));
  await disconnectDatabase();
}

main().catch((err) => {
  console.error('Fatal ingestion error:', err);
  process.exit(1);
});
