ALTER TABLE items DROP COLUMN IF EXISTS description;
ALTER TABLE items DROP COLUMN IF EXISTS price;
ALTER TABLE items ADD CONSTRAINT items_name_length CHECK (char_length(name) <= 500);
