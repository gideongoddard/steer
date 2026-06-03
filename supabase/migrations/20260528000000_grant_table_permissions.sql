-- Grant table-level permissions to the anon and authenticated roles.
-- RLS policies enforce row-level access on top of these grants.

-- lists: anyone can read; authenticated users can write (RLS limits to owner)
GRANT SELECT ON lists TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON lists TO authenticated;

-- items: anyone can read; authenticated users can write (RLS limits to list owner)
GRANT SELECT ON items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON items TO authenticated;

-- claims: only authenticated non-owners can read/write (enforced by RLS)
GRANT SELECT, INSERT, DELETE ON claims TO authenticated;
