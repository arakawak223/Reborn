CREATE TABLE athlete_injuries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  body_region body_region NOT NULL,
  injury_type injury_type NOT NULL,
  diagnosis TEXT NOT NULL,
  severity INTEGER NOT NULL CHECK (severity BETWEEN 1 AND 10),
  recovery_months INTEGER NOT NULL,
  year_occurred INTEGER NOT NULL,
  description TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE body_region_coordinates (
  region body_region PRIMARY KEY,
  x REAL NOT NULL,
  y REAL NOT NULL,
  z REAL NOT NULL,
  label TEXT NOT NULL,
  label_ja TEXT NOT NULL
);

CREATE INDEX idx_injury_athlete ON athlete_injuries(athlete_id);
CREATE INDEX idx_injury_region ON athlete_injuries(body_region);
