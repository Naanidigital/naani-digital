import fs from 'fs';
import path from 'path';

// Helper to extract fields from an SQL migration file
export function parseMigrationSql(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Match INSERT INTO public.projects (...) VALUES (...)
  const insertMatch = content.match(/INSERT\s+INTO\s+public\.projects\s*\(([\s\S]*?)\)\s*VALUES\s*\(([\s\S]*?)\)(?:\s*ON\s+CONFLICT|$)/i);
  if (!insertMatch) {
    // Might be an UPDATE statement or custom format
    return null;
  }

  const rawCols = insertMatch[1].split(',').map(c => c.trim().replace(/["']/g, ''));
  const rawVals = insertMatch[2].trim();

  // Parse values safely
  const record = {};
  
  // Custom tokenizer for SQL value list
  const values = [];
  let current = '';
  let inString = false;
  let inArray = false;
  let arrayDepth = 0;

  for (let i = 0; i < rawVals.length; i++) {
    const char = rawVals[i];
    const prevChar = i > 0 ? rawVals[i - 1] : '';
    const nextChar = i < rawVals.length - 1 ? rawVals[i + 1] : '';

    if (char === "'" && prevChar !== '\\') {
      if (inString && nextChar === "'") {
        current += "'";
        i++; // skip escaped quote
        continue;
      }
      inString = !inString;
      current += char;
    } else if (!inString && (char === '[' || (char === 'A' && rawVals.substr(i, 6) === 'ARRAY['))) {
      if (char === 'A') {
        current += 'ARRAY[';
        i += 5;
      } else {
        current += char;
      }
      inArray = true;
      arrayDepth++;
    } else if (!inString && char === ']' && inArray) {
      current += char;
      arrayDepth--;
      if (arrayDepth === 0) inArray = false;
    } else if (!inString && !inArray && char === ',') {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) values.push(current.trim());

  for (let i = 0; i < rawCols.length && i < values.length; i++) {
    const col = rawCols[i];
    let val = values[i];

    if (val === 'NULL' || val === 'null') {
      record[col] = null;
    } else if (val === 'true' || val === 'TRUE') {
      record[col] = true;
    } else if (val === 'false' || val === 'FALSE') {
      record[col] = false;
    } else if (val.startsWith("'") && val.endsWith("'")) {
      record[col] = val.slice(1, -1).replace(/''/g, "'");
    } else if (val.startsWith('ARRAY[') && val.endsWith(']')) {
      const inner = val.slice(6, -1).trim();
      if (!inner) {
        record[col] = [];
      } else {
        // Parse array elements
        const items = [];
        let itemCur = '';
        let itemInStr = false;
        for (let j = 0; j < inner.length; j++) {
          const c = inner[j];
          if (c === "'") {
            itemInStr = !itemInStr;
          } else if (c === ',' && !itemInStr) {
            items.push(itemCur.trim().replace(/^'|'$/g, '').replace(/''/g, "'"));
            itemCur = '';
          } else {
            itemCur += c;
          }
        }
        if (itemCur.trim()) items.push(itemCur.trim().replace(/^'|'$/g, '').replace(/''/g, "'"));
        
        if (col === 'bhk_list') {
          record[col] = items.map(x => parseInt(x, 10)).filter(x => !isNaN(x));
        } else {
          record[col] = items;
        }
      }
    } else if (/^\d+$/.test(val)) {
      record[col] = parseInt(val, 10);
    } else if (/^\d+\.\d+$/.test(val)) {
      record[col] = parseFloat(val);
    } else {
      record[col] = val.replace(/^'|'$/g, '');
    }
  }

  return record;
}

// Test against Candeur Arbora migration
const arboraPath = path.resolve('naani-main/supabase/migrations/20261112000000_add_candeur_arbora.sql');
const arboraParsed = parseMigrationSql(arboraPath);
console.log('Parsed Candeur Arbora:', {
  slug: arboraParsed.slug,
  name: arboraParsed.name,
  builder: arboraParsed.builder,
  location: arboraParsed.location,
  amenitiesCount: arboraParsed.amenities ? arboraParsed.amenities.length : 0,
  price: arboraParsed.price_range
});
