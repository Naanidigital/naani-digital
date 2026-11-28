-- ==============================================================================
-- Migration: 20261121000000_create_crm_tables.sql
-- Description: Phase 1 Database setup for WhatsApp Cloud API & CRM integration.
-- Creates crm_leads, crm_conversations, and crm_messages with strict RLS,
-- indexes, triggers, and Supabase Realtime pub/sub replication.
-- ==============================================================================

-- 1. Helper function for phone normalization (Indian 10-digit mobile matching)
CREATE OR REPLACE FUNCTION public.normalize_phone(phone_input text)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE 
    WHEN phone_input IS NULL THEN NULL
    ELSE RIGHT(regexp_replace(phone_input, '[^0-9]', '', 'g'), 10)
  END;
$$;

-- 2. CRM Leads Table
CREATE TABLE IF NOT EXISTS public.crm_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  looking_for TEXT,
  budget TEXT,
  preferred_location TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  source TEXT NOT NULL DEFAULT 'whatsapp',
  notes TEXT,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  last_contacted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_crm_leads_status CHECK (
    status IN ('new', 'contacted', 'qualified', 'site_visit_scheduled', 'negotiation', 'closed_won', 'closed_lost', 'archived')
  )
);

CREATE INDEX IF NOT EXISTS idx_crm_leads_phone ON public.crm_leads(phone);
CREATE INDEX IF NOT EXISTS idx_crm_leads_norm_phone ON public.crm_leads(public.normalize_phone(phone));
CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON public.crm_leads(status);
CREATE INDEX IF NOT EXISTS idx_crm_leads_created_at ON public.crm_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_leads_assigned ON public.crm_leads(assigned_to);

-- 3. CRM Conversations Table (Threads by WhatsApp ID)
CREATE TABLE IF NOT EXISTS public.crm_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.crm_leads(id) ON DELETE SET NULL,
  wa_id TEXT NOT NULL UNIQUE,
  customer_name TEXT,
  channel TEXT NOT NULL DEFAULT 'whatsapp',
  status TEXT NOT NULL DEFAULT 'open',
  unread_count INTEGER NOT NULL DEFAULT 0,
  last_message_text TEXT,
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_crm_conv_status CHECK (
    status IN ('open', 'resolved', 'archived')
  )
);

CREATE INDEX IF NOT EXISTS idx_crm_conv_wa_id ON public.crm_conversations(wa_id);
CREATE INDEX IF NOT EXISTS idx_crm_conv_lead_id ON public.crm_conversations(lead_id);
CREATE INDEX IF NOT EXISTS idx_crm_conv_last_msg ON public.crm_conversations(last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_conv_status ON public.crm_conversations(status);

-- 4. CRM Messages Table (Inbound & Outbound WhatsApp History)
CREATE TABLE IF NOT EXISTS public.crm_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.crm_conversations(id) ON DELETE CASCADE,
  wa_message_id TEXT UNIQUE,
  direction TEXT NOT NULL,
  sender_type TEXT NOT NULL,
  sender_id TEXT,
  message_type TEXT NOT NULL DEFAULT 'text',
  content TEXT,
  media_url TEXT,
  status TEXT NOT NULL DEFAULT 'received',
  error_message TEXT,
  raw_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_crm_msg_direction CHECK (direction IN ('inbound', 'outbound')),
  CONSTRAINT chk_crm_msg_sender CHECK (sender_type IN ('customer', 'agent', 'system')),
  CONSTRAINT chk_crm_msg_status CHECK (status IN ('received', 'sent', 'delivered', 'read', 'failed'))
);

CREATE INDEX IF NOT EXISTS idx_crm_msg_conv_time ON public.crm_messages(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_crm_msg_wa_id ON public.crm_messages(wa_message_id);
CREATE INDEX IF NOT EXISTS idx_crm_msg_status ON public.crm_messages(status);

-- 5. Updated At Triggers (Reuses existing public.set_updated_at function)
DROP TRIGGER IF EXISTS crm_leads_set_updated_at ON public.crm_leads;
CREATE TRIGGER crm_leads_set_updated_at
  BEFORE UPDATE ON public.crm_leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS crm_conversations_set_updated_at ON public.crm_conversations;
CREATE TRIGGER crm_conversations_set_updated_at
  BEFORE UPDATE ON public.crm_conversations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 6. Grant Permissions
-- Service Role: Full access for Edge Functions (webhook & outbound sender)
GRANT ALL ON public.crm_leads TO service_role;
GRANT ALL ON public.crm_conversations TO service_role;
GRANT ALL ON public.crm_messages TO service_role;

-- Authenticated Users: Data access governed by RLS
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_leads TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_conversations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_messages TO authenticated;

-- Anon / Public: Explicitly revoke all privileges to secure customer data
REVOKE ALL ON public.crm_leads FROM anon;
REVOKE ALL ON public.crm_conversations FROM anon;
REVOKE ALL ON public.crm_messages FROM anon;

-- 7. Configure Row Level Security (RLS)
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_messages ENABLE ROW LEVEL SECURITY;

-- CRM Leads RLS Policies
DROP POLICY IF EXISTS "Staff can read crm_leads" ON public.crm_leads;
CREATE POLICY "Staff can read crm_leads"
  ON public.crm_leads FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

DROP POLICY IF EXISTS "Staff can insert crm_leads" ON public.crm_leads;
CREATE POLICY "Staff can insert crm_leads"
  ON public.crm_leads FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

DROP POLICY IF EXISTS "Staff can update crm_leads" ON public.crm_leads;
CREATE POLICY "Staff can update crm_leads"
  ON public.crm_leads FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

DROP POLICY IF EXISTS "Admins can delete crm_leads" ON public.crm_leads;
CREATE POLICY "Admins can delete crm_leads"
  ON public.crm_leads FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- CRM Conversations RLS Policies
DROP POLICY IF EXISTS "Staff can read crm_conversations" ON public.crm_conversations;
CREATE POLICY "Staff can read crm_conversations"
  ON public.crm_conversations FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

DROP POLICY IF EXISTS "Staff can insert crm_conversations" ON public.crm_conversations;
CREATE POLICY "Staff can insert crm_conversations"
  ON public.crm_conversations FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

DROP POLICY IF EXISTS "Staff can update crm_conversations" ON public.crm_conversations;
CREATE POLICY "Staff can update crm_conversations"
  ON public.crm_conversations FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

DROP POLICY IF EXISTS "Admins can delete crm_conversations" ON public.crm_conversations;
CREATE POLICY "Admins can delete crm_conversations"
  ON public.crm_conversations FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- CRM Messages RLS Policies
DROP POLICY IF EXISTS "Staff can read crm_messages" ON public.crm_messages;
CREATE POLICY "Staff can read crm_messages"
  ON public.crm_messages FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

DROP POLICY IF EXISTS "Staff can insert crm_messages" ON public.crm_messages;
CREATE POLICY "Staff can insert crm_messages"
  ON public.crm_messages FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

DROP POLICY IF EXISTS "Staff can update crm_messages" ON public.crm_messages;
CREATE POLICY "Staff can update crm_messages"
  ON public.crm_messages FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

DROP POLICY IF EXISTS "Admins can delete crm_messages" ON public.crm_messages;
CREATE POLICY "Admins can delete crm_messages"
  ON public.crm_messages FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 8. Enable Supabase Realtime Replication for Conversations & Messages
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'crm_conversations'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_conversations;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'crm_messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_messages;
  END IF;
END $$;
