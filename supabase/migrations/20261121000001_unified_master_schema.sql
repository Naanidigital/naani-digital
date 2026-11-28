-- ==============================================================================
-- Master Schema Migration: 20261121000001_unified_master_schema.sql
-- Target: lpbdwmpglwdedqdiovqu (Naani.in Primary Production Backend)
-- Description: Consolidated master database schema for Naani.in, Naani CRM,
-- and WhatsApp Cloud API integration. Idempotent and safe to run on fresh project.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. BASE UTILITY FUNCTIONS & ENUMS
-- ------------------------------------------------------------------------------

-- Generic updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Phone normalization helper (Indian 10-digit mobile matching)
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

-- Application roles enum
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ------------------------------------------------------------------------------
-- 2. ROLE-BASED ACCESS CONTROL (RBAC)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_user_roles_user_role UNIQUE (user_id, role)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Authorization security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 3. UPLOAD TICKETS (SECURE TIME-LIMITED MEDIA UPLOADS)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.upload_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.upload_tickets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create an upload ticket" ON public.upload_tickets;
CREATE POLICY "Anyone can create an upload ticket"
  ON public.upload_tickets FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read upload tickets" ON public.upload_tickets;
CREATE POLICY "Admins can read upload tickets"
  ON public.upload_tickets FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.is_valid_upload_ticket(_ticket text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.upload_tickets t
    WHERE _ticket ~ '^[0-9a-f-]{36}$'
      AND t.id = _ticket::uuid
      AND t.created_at > now() - interval '2 hours'
  )
$$;

REVOKE ALL ON FUNCTION public.is_valid_upload_ticket(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_valid_upload_ticket(text) TO anon, authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 4. COMPLETE PROPERTY CATALOGUE (DYNAMIC PROJECT COUNT)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  builder TEXT,
  location TEXT,
  city TEXT DEFAULT 'Hyderabad',
  configuration TEXT,
  bhk_list INT[] DEFAULT '{}',
  property_type TEXT DEFAULT 'Apartment',
  price_range TEXT,
  min_price_inr BIGINT,
  max_price_inr BIGINT,
  status TEXT,
  possession TEXT,
  usp TEXT,
  description TEXT,
  amenities TEXT[] DEFAULT '{}',
  faqs JSONB DEFAULT '[]'::jsonb,
  gallery TEXT[] DEFAULT '{}',
  hero_image TEXT,
  brochure_url TEXT,
  map_embed_url TEXT,
  seo_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  custom_page_path TEXT,
  featured BOOLEAN DEFAULT false,
  publish_status TEXT NOT NULL DEFAULT 'published',
  submitted_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  source TEXT DEFAULT 'internal',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_location ON public.projects(location);
CREATE INDEX IF NOT EXISTS idx_projects_builder ON public.projects(builder);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_publish_status ON public.projects(publish_status);

DROP TRIGGER IF EXISTS projects_set_updated_at ON public.projects;
CREATE TRIGGER projects_set_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Projects are viewable by everyone" ON public.projects;
CREATE POLICY "Projects are viewable by everyone"
  ON public.projects FOR SELECT
  USING (publish_status = 'published' OR (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin')));

DROP POLICY IF EXISTS "Anyone can submit a pending property" ON public.projects;
CREATE POLICY "Anyone can submit a pending property"
  ON public.projects FOR INSERT TO anon, authenticated
  WITH CHECK (publish_status = 'pending' AND source IS NOT NULL AND featured IS NOT TRUE);

DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')))
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;
CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));

-- ------------------------------------------------------------------------------
-- 5. PROJECT SUBMISSIONS (PRIVATE PROPERTY OWNER PII)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.project_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL,
  submitter_name TEXT,
  submitter_phone TEXT NOT NULL,
  submitter_email TEXT,
  submitter_whatsapp TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_proj_submissions_project_id ON public.project_submissions(project_id);
CREATE INDEX IF NOT EXISTS idx_proj_submissions_phone ON public.project_submissions(submitter_phone);

DROP TRIGGER IF EXISTS project_submissions_set_updated_at ON public.project_submissions;
CREATE TRIGGER project_submissions_set_updated_at
  BEFORE UPDATE ON public.project_submissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit contact details" ON public.project_submissions;
CREATE POLICY "Anyone can submit contact details"
  ON public.project_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (submitter_phone IS NOT NULL);

DROP POLICY IF EXISTS "Admins can read submitter contact details" ON public.project_submissions;
CREATE POLICY "Admins can read submitter contact details"
  ON public.project_submissions FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));

-- ------------------------------------------------------------------------------
-- 6. CRM LEADS
-- ------------------------------------------------------------------------------

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

DROP TRIGGER IF EXISTS crm_leads_set_updated_at ON public.crm_leads;
CREATE TRIGGER crm_leads_set_updated_at
  BEFORE UPDATE ON public.crm_leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff can read crm_leads" ON public.crm_leads;
CREATE POLICY "Staff can read crm_leads"
  ON public.crm_leads FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can insert crm_leads" ON public.crm_leads;
CREATE POLICY "Staff can insert crm_leads"
  ON public.crm_leads FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can update crm_leads" ON public.crm_leads;
CREATE POLICY "Staff can update crm_leads"
  ON public.crm_leads FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')))
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Admins can delete crm_leads" ON public.crm_leads;
CREATE POLICY "Admins can delete crm_leads"
  ON public.crm_leads FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));

-- ------------------------------------------------------------------------------
-- 7. CRM CONVERSATIONS
-- ------------------------------------------------------------------------------

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

DROP TRIGGER IF EXISTS crm_conversations_set_updated_at ON public.crm_conversations;
CREATE TRIGGER crm_conversations_set_updated_at
  BEFORE UPDATE ON public.crm_conversations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.crm_conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff can read crm_conversations" ON public.crm_conversations;
CREATE POLICY "Staff can read crm_conversations"
  ON public.crm_conversations FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can insert crm_conversations" ON public.crm_conversations;
CREATE POLICY "Staff can insert crm_conversations"
  ON public.crm_conversations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can update crm_conversations" ON public.crm_conversations;
CREATE POLICY "Staff can update crm_conversations"
  ON public.crm_conversations FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')))
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Admins can delete crm_conversations" ON public.crm_conversations;
CREATE POLICY "Admins can delete crm_conversations"
  ON public.crm_conversations FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));

-- ------------------------------------------------------------------------------
-- 8. CRM MESSAGES
-- ------------------------------------------------------------------------------

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

ALTER TABLE public.crm_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff can read crm_messages" ON public.crm_messages;
CREATE POLICY "Staff can read crm_messages"
  ON public.crm_messages FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can insert crm_messages" ON public.crm_messages;
CREATE POLICY "Staff can insert crm_messages"
  ON public.crm_messages FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Staff can update crm_messages" ON public.crm_messages;
CREATE POLICY "Staff can update crm_messages"
  ON public.crm_messages FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')))
  WITH CHECK (auth.uid() IS NOT NULL AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator')));

DROP POLICY IF EXISTS "Admins can delete crm_messages" ON public.crm_messages;
CREATE POLICY "Admins can delete crm_messages"
  ON public.crm_messages FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin'));

-- ------------------------------------------------------------------------------
-- 9. PERMISSIONS & SERVICE ROLE
-- ------------------------------------------------------------------------------

GRANT ALL ON public.projects TO service_role;
GRANT ALL ON public.project_submissions TO service_role;
GRANT ALL ON public.user_roles TO service_role;
GRANT ALL ON public.upload_tickets TO service_role;
GRANT ALL ON public.crm_leads TO service_role;
GRANT ALL ON public.crm_conversations TO service_role;
GRANT ALL ON public.crm_messages TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT INSERT ON public.upload_tickets TO authenticated;
GRANT SELECT, INSERT ON public.project_submissions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_leads TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_conversations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.crm_messages TO authenticated;

GRANT SELECT, INSERT ON public.projects TO anon;
GRANT INSERT ON public.project_submissions TO anon;
GRANT INSERT ON public.upload_tickets TO anon;
REVOKE ALL ON public.user_roles FROM anon;
REVOKE ALL ON public.crm_leads FROM anon;
REVOKE ALL ON public.crm_conversations FROM anon;
REVOKE ALL ON public.crm_messages FROM anon;

-- ------------------------------------------------------------------------------
-- 10. REALTIME PUBLICATION
-- ------------------------------------------------------------------------------

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

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'projects'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
  END IF;
END $$;
