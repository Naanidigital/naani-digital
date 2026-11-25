// ==============================================================================
// File Parser for CSV and Excel (.xlsx, .xls)
// High-efficiency parsing with SheetJS (xlsx)
// ==============================================================================

import * as XLSX from 'xlsx';
import { RawParsedRow } from './types';

export interface ParseResult {
  filename: string;
  fileSizeBytes: number;
  headers: string[];
  totalRows: number;
  rows: RawParsedRow[];
}

/**
 * Parses a File object (CSV or Excel) into headers and normalized row objects.
 */
export async function parseSpreadsheetFile(file: File): Promise<ParseResult> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, {
    type: 'array',
    cellDates: true,
    cellNF: false,
    cellText: false,
  });

  // Read first sheet
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error('Spreadsheet file contains no worksheets.');
  }

  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    throw new Error(`Unable to load worksheet '${sheetName}'.`);
  }

  // Convert to 2D array of raw values to inspect headers reliably
  const rawMatrix: any[][] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: '',
    blankrows: false,
  });

  if (rawMatrix.length === 0) {
    throw new Error('Spreadsheet file is completely empty.');
  }

  // 1. Identify header row (first non-empty row)
  let headerRowIndex = 0;
  while (headerRowIndex < rawMatrix.length && rawMatrix[headerRowIndex].filter(Boolean).length === 0) {
    headerRowIndex++;
  }

  if (headerRowIndex >= rawMatrix.length) {
    throw new Error('No valid header row found in spreadsheet.');
  }

  const rawHeaders = rawMatrix[headerRowIndex];
  const headers: string[] = rawHeaders.map((h, i) => {
    const str = String(h || '').trim();
    return str || `Column_${i + 1}`;
  });

  // 2. Extract data rows
  const rows: RawParsedRow[] = [];
  let rowCounter = 1;

  for (let r = headerRowIndex + 1; r < rawMatrix.length; r++) {
    const rowValues = rawMatrix[r];
    // Skip row if completely empty
    if (!rowValues || rowValues.every((val: any) => String(val || '').trim() === '')) {
      continue;
    }

    const rowObj: Record<string, any> = {};
    for (let c = 0; c < headers.length; c++) {
      const headerName = headers[c];
      const cellVal = rowValues[c] !== undefined ? rowValues[c] : '';
      rowObj[headerName] = cellVal;
    }

    rows.push({
      rowIndex: rowCounter++,
      data: rowObj,
    });
  }

  return {
    filename: file.name,
    fileSizeBytes: file.size,
    headers,
    totalRows: rows.length,
    rows,
  };
}
