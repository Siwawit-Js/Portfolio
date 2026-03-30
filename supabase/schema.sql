-- ============================================
-- Portfolio System — Supabase Schema
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- Profile (single row for your personal info)
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Your Name',
  role TEXT NOT NULL DEFAULT 'Full Stack Developer',
  bio TEXT DEFAULT 'A short intro about yourself.',
  about TEXT DEFAULT 'A longer description about yourself, your journey, and what drives you.',
  avatar_url TEXT,
  resume_url TEXT,
  email TEXT DEFAULT 'hello@example.com',
  github TEXT DEFAULT 'https://github.com/yourusername',
  linkedin TEXT DEFAULT 'https://linkedin.com/in/yourusername',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert a default profile row
INSERT INTO profile (name, role, bio, about, email)
VALUES ('Your Name', 'Full Stack Developer', 'Passionate developer crafting digital experiences.', 'I am a passionate developer with experience in building modern web applications. I love turning ideas into reality through clean code and thoughtful design.', 'hello@example.com');

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  icon TEXT,
  proficiency INT DEFAULT 80 CHECK (proficiency >= 0 AND proficiency <= 100),
  sort_order INT DEFAULT 0
);

-- Experience
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  is_current BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- Public READ access (for portfolio app)
CREATE POLICY "Public read profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read experience" ON experience FOR SELECT USING (true);

-- Authenticated WRITE access (for admin app)
CREATE POLICY "Auth insert profile" ON profile FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update profile" ON profile FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete profile" ON profile FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert skills" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update skills" ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete skills" ON skills FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert experience" ON experience FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update experience" ON experience FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete experience" ON experience FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE (run in Supabase Dashboard > Storage)
-- ============================================
-- 1. Create a bucket named "portfolio-images" (set to Public)
-- 2. Add policy: authenticated users can upload (INSERT)
-- 3. Add policy: public can read (SELECT)
