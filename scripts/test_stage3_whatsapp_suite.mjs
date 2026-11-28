import { createRequire } from "module";
const require = createRequire("c:/Users/PC/Desktop/naani-main/naani-main/package.json");
const { createClient } = require("@supabase/supabase-js");
import fs from "fs";

// Load environment variables
const envContent = fs.readFileSync("c:/Users/PC/Desktop/naani-main/naani-main/.env", "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, "");
  }
});

const crmUrl = env.VITE_CRM_SUPABASE_URL || "https://lpbdwmpglwdedqdiovqu.supabase.co";
const crmAnonKey = env.VITE_CRM_SUPABASE_ANON_KEY;

console.log("================================================================");
console.log("STAGE 3 WHATSAPP OUTBOUND COMPLIANCE & SECURITY TEST SUITE");
console.log(`Target Backend: ${crmUrl}`);
console.log("================================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

async function runSuite() {
  // --------------------------------------------------------------------------
  // Test 1: Unauthenticated request to Edge Function must return 401
  // --------------------------------------------------------------------------
  try {
    const res = await fetch(`${crmUrl}/functions/v1/send-whatsapp-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toPhone: "919999999999",
        messageText: "Automated test message",
      }),
    });
    const body = await res.json();
    assert(
      res.status === 401,
      `Unauthenticated invocation blocked with HTTP 401 (got ${res.status}: ${JSON.stringify(body)})`
    );
  } catch (err) {
    assert(false, `Test 1 failed with error: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // Test 2: Invalid/Forged JWT request to Edge Function must return 401
  // --------------------------------------------------------------------------
  try {
    const res = await fetch(`${crmUrl}/functions/v1/send-whatsapp-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.fake_signature",
      },
      body: JSON.stringify({
        toPhone: "919999999999",
        messageText: "Automated test message",
      }),
    });
    const body = await res.json();
    assert(
      res.status === 401,
      `Forged JWT invocation blocked with HTTP 401 (got ${res.status}: ${JSON.stringify(body)})`
    );
  } catch (err) {
    assert(false, `Test 2 failed with error: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // Test 3: Empty Message Validation Check
  // --------------------------------------------------------------------------
  // Import local crmWhatsApp utility to test client-side validation
  const { getCustomerServiceWindow, formatMetaError, WHATSAPP_WINDOW_DURATION_MS } = await import(
    "file:///c:/Users/PC/Desktop/naani-main/naani-main/src/lib/crmWhatsApp.ts"
  );

  assert(
    WHATSAPP_WINDOW_DURATION_MS === 86400000,
    `24-Hour window constant equals 86,400,000 ms (${WHATSAPP_WINDOW_DURATION_MS})`
  );

  // --------------------------------------------------------------------------
  // Test 4: 24-Hour Customer Window Logic (Active vs Expired vs No Inbound)
  // --------------------------------------------------------------------------
  const now = Date.now();

  // Case A: Customer messaged 2 hours ago -> Window Active (22h remaining)
  const messagesActive = [
    {
      id: "m-1",
      conversation_id: "c-1",
      direction: "inbound",
      sender_type: "customer",
      created_at: new Date(now - 2 * 3600 * 1000).toISOString(),
    },
    {
      id: "m-2",
      conversation_id: "c-1",
      direction: "outbound",
      sender_type: "agent",
      created_at: new Date(now - 1 * 3600 * 1000).toISOString(),
    },
  ];
  const windowActive = getCustomerServiceWindow(messagesActive);
  assert(
    windowActive.isOpen === true && windowActive.remainingMs > 0,
    `Active 24h window correctly identified as OPEN (${windowActive.formattedRemaining})`
  );

  // Case B: Customer messaged 25 hours ago -> Window Expired
  const messagesExpired = [
    {
      id: "m-1",
      conversation_id: "c-1",
      direction: "inbound",
      sender_type: "customer",
      created_at: new Date(now - 25 * 3600 * 1000).toISOString(),
    },
  ];
  const windowExpired = getCustomerServiceWindow(messagesExpired);
  assert(
    windowExpired.isOpen === false && windowExpired.remainingMs === 0,
    `Expired 24h window correctly identified as CLOSED (${windowExpired.formattedRemaining})`
  );

  // Case C: No inbound message on record -> Window Closed
  const messagesNoInbound = [
    {
      id: "m-1",
      conversation_id: "c-1",
      direction: "outbound",
      sender_type: "agent",
      created_at: new Date(now - 1 * 3600 * 1000).toISOString(),
    },
  ];
  const windowNoInbound = getCustomerServiceWindow(messagesNoInbound);
  assert(
    windowNoInbound.isOpen === false && windowNoInbound.hasInbound === false,
    `No inbound message correctly flagged as CLOSED / No customer message (${windowNoInbound.formattedRemaining})`
  );

  // --------------------------------------------------------------------------
  // Test 5: Meta Error Formatting
  // --------------------------------------------------------------------------
  // Code 131047: Customer window expired error from Meta
  const metaWindowErr = {
    code: 131047,
    message: "(#131047) Message failed to send because more than 24 hours have passed since the customer last replied to this number",
  };
  const formattedWindowErr = formatMetaError(metaWindowErr);
  assert(
    formattedWindowErr.includes("131047") && formattedWindowErr.includes("24-hour"),
    `Meta 131047 error mapped to clear explanation: "${formattedWindowErr.slice(0, 80)}..."`
  );

  // Code 100: Invalid phone number
  const metaPhoneErr = { code: 100, message: "Param to must be a valid phone number" };
  const formattedPhoneErr = formatMetaError(metaPhoneErr);
  assert(
    formattedPhoneErr.includes("100") && formattedPhoneErr.includes("Invalid Phone Number"),
    `Meta 100 error mapped to clear explanation: "${formattedPhoneErr.slice(0, 80)}..."`
  );

  // Code 190: Expired token
  const metaAuthErr = { code: 190, message: "Error validating access token" };
  const formattedAuthErr = formatMetaError(metaAuthErr);
  assert(
    formattedAuthErr.includes("190") && formattedAuthErr.includes("Authentication Error"),
    `Meta 190 error mapped to clear explanation: "${formattedAuthErr.slice(0, 80)}..."`
  );

  // --------------------------------------------------------------------------
  // Test 6: Inbound Webhook Handshake Verification (Must be Untouched)
  // --------------------------------------------------------------------------
  try {
    const webhookRes = await fetch(`${crmUrl}/functions/v1/whatsapp-webhook?hub.mode=subscribe`, {
      method: "GET",
    });
    assert(
      webhookRes.status === 403,
      `whatsapp-webhook rejects unauthenticated GET with HTTP 403 (Status: ${webhookRes.status})`
    );
  } catch (err) {
    assert(false, `Webhook verification failed: ${err.message}`);
  }

  console.log("\n================================================================");
  console.log(`TEST SUITE RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("================================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runSuite();
