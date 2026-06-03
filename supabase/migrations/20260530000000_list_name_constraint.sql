ALTER TABLE lists ADD CONSTRAINT lists_name_length CHECK (char_length(name) <= 100);
