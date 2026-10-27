-- ==============================================================================
-- MZANSI MIDNIGHT // SUPABASE LEADERBOARD & CLOUD SYNC SCHEMA
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Create Leaderboard Table
CREATE TABLE IF NOT EXISTS public.mzansi_leaderboard (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    player_name TEXT NOT NULL,
    player_avatar TEXT,
    score INTEGER NOT NULL,
    rank_title TEXT NOT NULL,
    story_id TEXT NOT NULL,
    story_name TEXT NOT NULL,
    ending_id TEXT NOT NULL,
    ending_title TEXT NOT NULL,
    completion_seconds INTEGER NOT NULL DEFAULT 0,
    completion_cycles INTEGER NOT NULL DEFAULT 1,
    endings_unlocked_count INTEGER NOT NULL DEFAULT 1,
    keystones_count INTEGER NOT NULL DEFAULT 0,
    composure INTEGER NOT NULL DEFAULT 50,
    cash INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for Apex Leaderboard (high scores)
CREATE INDEX IF NOT EXISTS idx_mzansi_leaderboard_score ON public.mzansi_leaderboard (score DESC);

-- Index for Speedrunners (quickest elapsed time)
CREATE INDEX IF NOT EXISTS idx_mzansi_leaderboard_speedrun ON public.mzansi_leaderboard (completion_seconds ASC) WHERE completion_seconds > 0;

-- Index for Completionists (most endings unlocked)
CREATE INDEX IF NOT EXISTS idx_mzansi_leaderboard_completionist ON public.mzansi_leaderboard (endings_unlocked_count DESC, score DESC);

-- Index for Regional Chapters
CREATE INDEX IF NOT EXISTS idx_mzansi_leaderboard_story ON public.mzansi_leaderboard (story_id, score DESC);

-- 2. Create User Cloud Saves Table (Campaign progression, 25 endings, achievements)
CREATE TABLE IF NOT EXISTS public.mzansi_user_saves (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    display_name TEXT,
    progression_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    unlocked_endings_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    achievements_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Row Level Security (RLS) Configuration
ALTER TABLE public.mzansi_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mzansi_user_saves ENABLE ROW LEVEL SECURITY;

-- Leaderboard: Anyone can read, authenticated or anon clients can insert high scores
CREATE POLICY "Public read access for leaderboard"
    ON public.mzansi_leaderboard FOR SELECT
    USING (true);

CREATE POLICY "Allow insertions to leaderboard"
    ON public.mzansi_leaderboard FOR INSERT
    WITH CHECK (true);

-- User Saves: Users can only read, insert, and update their own cloud saves
CREATE POLICY "Users can view own cloud saves"
    ON public.mzansi_user_saves FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cloud saves"
    ON public.mzansi_user_saves FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cloud saves"
    ON public.mzansi_user_saves FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
