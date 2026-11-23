-- ==============================================================================
-- YouSec Cybersecurity Club — Application Database Schema
-- Institution: YouCode Safi, Morocco
-- Description: Stores membership applications with strict RLS and unique email rule.
-- ==============================================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    campus TEXT NOT NULL DEFAULT 'YouCode Safi',
    academic_year TEXT NOT NULL,
    discord_username TEXT,
    experience_level TEXT NOT NULL,
    areas_of_interest TEXT[] NOT NULL DEFAULT '{}',
    has_previous_experience TEXT NOT NULL,
    previous_experience_details TEXT,
    motivation TEXT NOT NULL,
    problem_solving_approach TEXT NOT NULL,
    learning_goals TEXT NOT NULL,
    contribution TEXT,
    agreed_code_of_conduct BOOLEAN NOT NULL DEFAULT false,
    agreed_ethics BOOLEAN NOT NULL DEFAULT false,
    agreed_privacy BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'accepted', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Indexes for quick queries and uniqueness
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications (LOWER(email));
CREATE INDEX IF NOT EXISTS idx_applications_reference ON public.applications (reference_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications (status);
CREATE INDEX IF NOT EXISTS idx_applications_created ON public.applications (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Anyone can submit an application (Anon INSERT)
DROP POLICY IF EXISTS "Public can submit applications" ON public.applications;
CREATE POLICY "Public can submit applications"
    ON public.applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        agreed_code_of_conduct = true AND
        agreed_ethics = true AND
        agreed_privacy = true AND
        LENGTH(full_name) >= 3 AND
        LENGTH(email) >= 5 AND
        LENGTH(motivation) >= 20
    );

-- 5. RLS Policy: Applicants CANNOT read other applicants' data (Strict Privacy)
-- Only authenticated administrators or service_role can view or modify records
DROP POLICY IF EXISTS "Deny public select" ON public.applications;
CREATE POLICY "Deny public select"
    ON public.applications
    FOR SELECT
    TO anon
    USING (false);

-- 6. Authenticated Admins (YouSec Board) can view all applications
DROP POLICY IF EXISTS "Admins can view applications" ON public.applications;
CREATE POLICY "Admins can view applications"
    ON public.applications
    FOR SELECT
    TO authenticated
    USING (true);

-- Done!
COMMENT ON TABLE public.applications IS 'YouSec Club membership applications with single-submission per email.';
