-- ============================================================
-- Tables
-- ============================================================

CREATE TABLE lists (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  share_code  TEXT        UNIQUE NOT NULL,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE items (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id     UUID        NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
  name        TEXT        NOT NULL,
  description TEXT,
  url         TEXT,
  price       NUMERIC(10,2),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE claims (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id     UUID        UNIQUE NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX items_list_id_idx ON items(list_id);
CREATE INDEX lists_user_id_idx ON lists(user_id);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE lists  ENABLE ROW LEVEL SECURITY;
ALTER TABLE items  ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;

-- Lists: anyone can read; only the owner can write
CREATE POLICY "lists_select" ON lists
  FOR SELECT USING (true);

CREATE POLICY "lists_insert" ON lists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "lists_update" ON lists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "lists_delete" ON lists
  FOR DELETE USING (auth.uid() = user_id);

-- Items: anyone can read; only the list owner can write
CREATE POLICY "items_select" ON items
  FOR SELECT USING (true);

CREATE POLICY "items_insert" ON items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM lists
      WHERE id = list_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "items_update" ON items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM lists
      WHERE id = list_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "items_delete" ON items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM lists
      WHERE id = list_id AND user_id = auth.uid()
    )
  );

-- Claims: authenticated non-owners can read and create;
--         owners are blocked from seeing claims on their own items;
--         claimers can only delete their own claims (unclaim)
CREATE POLICY "claims_select" ON claims
  FOR SELECT USING (
    auth.uid() IS NOT NULL
    AND NOT EXISTS (
      SELECT 1 FROM items i
      JOIN lists l ON l.id = i.list_id
      WHERE i.id = item_id
      AND l.user_id = auth.uid()
    )
  );

CREATE POLICY "claims_insert" ON claims
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
    AND auth.uid() = user_id
    AND NOT EXISTS (
      SELECT 1 FROM items i
      JOIN lists l ON l.id = i.list_id
      WHERE i.id = item_id
      AND l.user_id = auth.uid()
    )
  );

CREATE POLICY "claims_delete" ON claims
  FOR DELETE USING (auth.uid() = user_id);
