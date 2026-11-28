import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { execSync } from "child_process";

const hadxUrl = "https://hadxpgwzmvxqslcyykyw.supabase.co";
const dotenv = fs.readFileSync(".env", "utf8");
let hadxKey = "";

dotenv.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (trimmed.startsWith("VITE_SUPABASE_PUBLISHABLE_KEY=")) {
    hadxKey = trimmed.split("=")[1].replace(/^["']|["']$/g, "");
  }
});

async function checkHadx() {
  console.log("Checking hadx via REST...");
  const supabase = createClient(hadxUrl, hadxKey);

  const { data: projects, count, error } = await supabase
    .from("projects")
    .select("*", { count: "exact" })
    .limit(1);

  if (error) {
    console.error("HADX error:", error);
  } else {
    console.log("HADX project count:", count);
    if (projects && projects.length > 0) {
      console.log("HADX columns (from first row):", Object.keys(projects[0]));
    }
  }

  // Check if builders table exists and what is in it
  const { data: builders, error: bErr } = await supabase
    .from("builders")
    .select("*")
    .limit(5);
  console.log("HADX builders data:", builders, "error:", bErr?.message);

  // Check if brigade or casagrand exists
  const { data: bProjects } = await supabase
    .from("projects")
    .select("id, slug, name, publish_status")
    .or("slug.ilike.%brigade%,slug.ilike.%casagrand%");
  console.log("HADX matching brigade/casagrand projects:", bProjects);
}

checkHadx();
