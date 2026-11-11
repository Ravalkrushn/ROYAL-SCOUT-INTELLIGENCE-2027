import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

const rootDir = path.resolve('..');

const inspectWorkbook = (relPath: string) => {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`[NOT FOUND] ${relPath}`);
    return;
  }
  console.log(`\n========================================`);
  console.log(`WORKBOOK: ${relPath}`);
  console.log(`========================================`);
  
  // Read with XLSX in read-only mode without macro execution
  const buf = fs.readFileSync(fullPath);
  const workbook = XLSX.read(buf, { type: 'buffer', bookVBA: false });
  console.log(`Sheets (${workbook.SheetNames.length}):`, workbook.SheetNames);

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const data: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const rowCount = data.length;
    const headerRow = data[0] || [];
    console.log(`\n  --- Sheet: "${sheetName}" ---`);
    console.log(`  Row count (including header): ${rowCount}`);
    console.log(`  Columns (${headerRow.length}):`, headerRow.slice(0, 15));
    if (headerRow.length > 15) {
      console.log(`    ... and ${headerRow.length - 15} more columns`);
    }
    if (data.length > 1) {
      console.log(`  Sample Row 1:`, data[1]);
    }
  }
};

inspectWorkbook('ROYAL_SCOUT_FINAL/Royal_Scout_Final_Rankings.xlsx');
inspectWorkbook('ROYAL_SCOUT_PHASE_13/Royal_Scout_Methodology_and_Evidence.xlsx');
