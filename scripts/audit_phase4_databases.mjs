import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const dotenv = fs.readFileSync(".env", "utf8");
let hadxUrl = "https://hadxpgwzmvxqslcyykyw.supabase.co";
let hadxKey = "";
let lpbdUrl = "https://lpbdwmpglwdedqdiovqu.supabase.co";
let lpbdKey = "";

dotenv.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (trimmed.startsWith("VITE_SUPABASE_PUBLISHABLE_KEY=")) {
    hadxKey = trimmed.split("=")[1].replace(/^["']|["']$/g, "");
  }
  if (trimmed.startsWith("VITE_CRM_SUPABASE_ANON_KEY=")) {
    lpbdKey = trimmed.split("=")[1].replace(/^["']|["']$/g, "");
  }
});

console.log("HADX Key length:", hadxKey.length);
console.log("LPBD Key length:", lpbdKey.length);

async function runAudit() {
  console.log("\n================ HADX (hadxpgwzmvxqslcyykyw) ================");
  const hadxClient = createClient(hadxUrl, hadxKey);

  // Projects
  try {
    const { data: hadxProjects, count: hadxCount, error: pErr } = await hadxClient
      .from("projects")
      .select("id, slug, name, publish_status, featured, builder, location", { count: "exact" })
      .limit(10);
    console.log("HADX Projects count:", hadxCount, "sample rows:", hadxProjects?.length, "error:", pErr?.message);
    if (hadxProjects && hadxProjects.length > 0) {
      console.log("HADX sample project keys:", Object.keys(hadxProjects[0]));
    }
  } catch (e) {
    console.error("HADX projects exception:", e.message);
  }

  // Builders
  try {
    const { data: hadxBuilders, count: bCount, error: bErr } = await hadxClient
      .from("builders")
      .select("*", { count: "exact" })
      .limit(10);
    console.log("HADX Builders count:", bCount, "sample rows:", hadxBuilders?.length, "error:", bErr?.message);
    if (hadxBuilders && hadxBuilders.length > 0) {
      console.log("HADX sample builder keys:", Object.keys(hadxBuilders[0]));
      console.log("HADX sample builder names:", hadxBuilders.map(b => b.name || b.builder_name || b.slug).slice(0, 5));
    }
  } catch (e) {
    console.error("HADX builders exception:", e.message);
  }

  console.log("\n================ LPBD (lpbdwmpglwdedqdiovqu) ================");
  const lpbdClient = createClient(lpbdUrl, lpbdKey);

  // Projects
  try {
    const { data: lpbdProjects, count: lpbdCount, error: pErr2 } = await lpbdClient
      .from("projects")
      .select("id, slug, name, publish_status, featured, builder, location", { count: "exact" })
      .limit(10);
    console.log("LPBD Projects count:", lpbdCount, "sample rows:", lpbdProjects?.length, "error:", pErr2?.message);
    if (lpbdProjects && lpbdProjects.length > 0) {
      console.log("LPBD sample project keys:", Object.keys(lpbdProjects[0]));
    }
  } catch (e) {
    console.error("LPBD projects exception:", e.message);
  }

  // Builders
  try {
    const { data: lpbdBuilders, count: bCount2, error: bErr2 } = await lpbdClient
      .from("builders")
      .select("*", { count: "exact" })
      .limit(10);
    console.log("LPBD Builders count:", bCount2, "sample rows:", bCount2?.length, "error:", bErr2?.message);
    if (lpbdBuilders && lpbdBuilders.length > 0) {
      console.log("LPBD sample builder keys:", Object.keys(lpbdBuilders[0]));
      console.log("LPBD sample builder names:", lpbdBuilders.map(b => b.name || b.builder_name || b.slug).slice(0, 5));
    }
  } catch (e) {
    console.error("LPBD builders exception:", e.message);
  }

  // Check specific slugs
  console.log("\n================ SPECIFIC SLUG LOOKUPS ================");
  const checkSlugs = ["brigade-kompally", "sunyuga-vantara", "casagrand-evon", "casagrand-evon-kompally"];
  for (const s of checkSlugs) {
    const { data: h } = await hadxClient.from("projects").select("id, slug, publish_status").eq("slug", s).maybeSingle();
    const { data: l } = await lpbdClient.from("projects").select("id, slug, publish_status").eq("slug", s).maybeSingle();
    console.log(`Slug '${s}': HADX ->`, h ? `${h.id} (${h.publish_status})` : "none", `| LPBD ->`, l ? `${l.id} (${l.publish_status})` : "none");
  }
}

runAudit();
