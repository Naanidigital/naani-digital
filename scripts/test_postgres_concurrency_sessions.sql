-- ==============================================================================
-- STAGE 5A: INTERACTIVE POSTGRESQL CONCURRENCY SESSIONS VERIFICATION
-- Run Session A in Tab 1 and Session B in Tab 2 to verify row-level locks,
-- FOR UPDATE SKIP LOCKED, rollback isolation, and non-blocking claims in PostgreSQL.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- SCENARIO 1: ATOMIC PAIR PACING (ROW-LEVEL LOCK MUTUAL EXCLUSION)
-- ------------------------------------------------------------------------------

-- In Session A:
BEGIN;
SELECT * FROM public.check_and_update_recipient_pacing('919000000001', 'campaign', NULL, 'worker_A', 60);
-- Holds row lock on '919000000001'
-- DO NOT COMMIT YET

-- In Session B (simultaneously):
-- Will wait for Session A's row lock, then immediately observe active cooldown:
SELECT * FROM public.check_and_update_recipient_pacing('919000000001', 'campaign', NULL, 'worker_B', 60);

-- Back in Session A:
COMMIT;
-- Session B unblocks and returns: can_dispatch = FALSE, seconds_remaining = 60, previous_source = 'campaign'


-- ------------------------------------------------------------------------------
-- SCENARIO 2: FOR UPDATE SKIP LOCKED CONCURRENT QUEUE BATCH CLAIMS
-- ------------------------------------------------------------------------------

-- Ensure campaign is running and has recipients:
-- Session A (claims 5 items):
BEGIN;
SELECT id, normalized_phone FROM public.claim_campaign_recipient_batch('00000000-0000-0000-0000-000000000001', 'worker_A', 5, 90);
-- Session A locks 5 items (status = 'sending')

-- Session B (concurrently claims 5 items):
-- Uses FOR UPDATE SKIP LOCKED, so Session B DOES NOT WAIT.
-- It immediately claims the NEXT 5 items with ZERO collision:
SELECT id, normalized_phone FROM public.claim_campaign_recipient_batch('00000000-0000-0000-0000-000000000001', 'worker_B', 5, 90);

-- Back in Session A:
COMMIT;


-- ------------------------------------------------------------------------------
-- SCENARIO 3: TRANSACTION ROLLBACK ISOLATION
-- ------------------------------------------------------------------------------

-- Session A:
BEGIN;
SELECT * FROM public.check_and_update_recipient_pacing('919000000099', 'crm_inbox', NULL, 'agent_fail', 60);
ROLLBACK;

-- Session B (immediately after):
-- Pacing record was rolled back; slot is cleanly available:
SELECT * FROM public.check_and_update_recipient_pacing('919000000099', 'campaign', NULL, 'worker_clean', 60);
-- Returns can_dispatch = TRUE


-- ------------------------------------------------------------------------------
-- SCENARIO 4: SECONDARY TRIGGER SAFETY NET (OUTBOUND SENT ONLY)
-- ------------------------------------------------------------------------------

-- Insert an inbound message: Trigger MUST NOT fire
INSERT INTO public.crm_messages (conversation_id, direction, status, content)
VALUES ('00000000-0000-0000-0000-000000000001', 'inbound', 'received', 'Hello');
-- Verify no pacing record created for customer wa_id

-- Insert a failed outbound message: Trigger MUST NOT fire
INSERT INTO public.crm_messages (conversation_id, direction, status, content)
VALUES ('00000000-0000-0000-0000-000000000001', 'outbound', 'failed', 'Attempt');
-- Verify no pacing record created

-- Insert a qualifying sent outbound message: Trigger reconciles
INSERT INTO public.crm_messages (conversation_id, direction, status, content)
VALUES ('00000000-0000-0000-0000-000000000001', 'outbound', 'sent', 'Confirmed');
-- Verify crm_whatsapp_recipient_pacing is populated with source_type = 'crm_inbox'
