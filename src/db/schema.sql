DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT DEFAULT '',
  about TEXT DEFAULT '',
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  is_archived INTEGER DEFAULT 0
);

CREATE INDEX idx_expires_at ON profiles(expires_at);
CREATE INDEX idx_is_archived ON profiles(is_archived);
