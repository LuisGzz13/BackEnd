-- Add salt column to users table
ALTER TABLE users
ADD salt VARCHAR(32) NOT NULL DEFAULT '';

-- Update existing users with a default salt (you should run this only once)
UPDATE users
SET salt = CONVERT(VARCHAR(32), NEWID()); 