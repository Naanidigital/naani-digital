import fs from "fs";

console.log("================================================================");
console.log("SQL STATEMENTS & DELIMITERS VALIDATION");
console.log("================================================================\n");

function splitStatements(sql) {
  const statements = [];
  let current = "";
  let inString = false;
  let inDollar = false;
  let dollarTag = "";
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    const next = sql[i + 1] || "";
    const prev = i > 0 ? sql[i - 1] : "";

    // Comments
    if (!inString && !inDollar) {
      if (!inLineComment && !inBlockComment && ch === "-" && next === "-") {
        inLineComment = true;
        current += ch;
        continue;
      }
      if (inLineComment && ch === "\n") {
        inLineComment = false;
        current += ch;
        continue;
      }
      if (!inLineComment && !inBlockComment && ch === "/" && next === "*") {
        inBlockComment = true;
        current += ch;
        continue;
      }
      if (inBlockComment && ch === "*" && next === "/") {
        inBlockComment = false;
        current += "*/";
        i++;
        continue;
      }
    }

    if (inLineComment || inBlockComment) {
      current += ch;
      continue;
    }

    // Single quotes
    if (!inDollar) {
      if (ch === "'") {
        if (inString && next === "'") {
          current += "''";
          i++;
          continue;
        }
        inString = !inString;
        current += ch;
        continue;
      }
    }

    // Dollar quoting ($$ or $tag$)
    if (!inString) {
      if (ch === "$") {
        const match = sql.substring(i).match(/^(\$[a-zA-Z0-9_]*\$)/);
        if (match) {
          const tag = match[1];
          if (!inDollar) {
            inDollar = true;
            dollarTag = tag;
            current += tag;
            i += tag.length - 1;
            continue;
          } else if (tag === dollarTag) {
            inDollar = false;
            dollarTag = "";
            current += tag;
            i += tag.length - 1;
            continue;
          }
        }
      }
    }

    // Semicolon outside strings and dollar quotes ends a statement
    if (!inString && !inDollar && ch === ";") {
      current += ";";
      if (current.trim().replace(/--.*$/gm, "").trim()) {
        statements.push(current.trim());
      }
      current = "";
      continue;
    }

    current += ch;
  }

  if (current.trim().replace(/--.*$/gm, "").trim()) {
    statements.push(current.trim());
  }

  return { statements, inString, inDollar, inLineComment, inBlockComment };
}

for (const file of [
  "c:/Users/PC/Desktop/naani-main/naani-main/supabase/migrations/20261124000000_create_campaign_tables.sql",
  "c:/Users/PC/Desktop/naani-main/naani-main/supabase/migrations/20261124000000_create_campaign_tables_rollback.sql"
]) {
  const content = fs.readFileSync(file, "utf8");
  const result = splitStatements(content);

  console.log(`File: ${file.split("/").pop()}`);
  console.log(`  - Total statements parsed: ${result.statements.length}`);
  console.log(`  - Unclosed string: ${result.inString}`);
  console.log(`  - Unclosed dollar quote: ${result.inDollar}`);
  console.log(`  - Unclosed block comment: ${result.inBlockComment}`);

  if (result.inString || result.inDollar || result.inBlockComment) {
    console.error(`  [FAIL] Syntax issue: unclosed block or quote detected in ${file}`);
    process.exit(1);
  } else {
    console.log(`  [PASS] All blocks, strings, and statements cleanly delimited.\n`);
  }
}
