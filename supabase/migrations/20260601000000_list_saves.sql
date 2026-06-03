-- ============================================================
-- Tables
-- ============================================================

CREATE TABLE list_saves (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  list_id     UUID        NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, list_id)
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX list_saves_user_id_idx ON list_saves(user_id);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE list_saves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "list_saves_select" ON list_saves
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "list_saves_insert" ON list_saves
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "list_saves_delete" ON list_saves
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- Grants
-- ============================================================

GRANT SELECT, INSERT, DELETE ON list_saves TO authenticated;
