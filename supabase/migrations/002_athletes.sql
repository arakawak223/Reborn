CREATE TABLE athletes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  sport sport_category NOT NULL,
  nationality TEXT NOT NULL,
  tagline TEXT NOT NULL,
  image_url TEXT,
  comeback_status comeback_status NOT NULL DEFAULT 'in_progress',
  birth_year INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE athlete_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  category asset_category NOT NULL,
  label TEXT NOT NULL,
  value_score INTEGER NOT NULL CHECK (value_score BETWEEN 1 AND 100),
  description TEXT
);

CREATE TABLE athlete_liabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  category liability_category NOT NULL,
  label TEXT NOT NULL,
  severity INTEGER NOT NULL CHECK (severity BETWEEN 1 AND 100),
  description TEXT
);

CREATE TABLE athlete_pl_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  category pl_category NOT NULL,
  label TEXT NOT NULL,
  magnitude INTEGER NOT NULL CHECK (magnitude BETWEEN 1 AND 100),
  is_expense BOOLEAN NOT NULL,
  description TEXT
);

CREATE TABLE comeback_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID NOT NULL UNIQUE REFERENCES athletes(id) ON DELETE CASCADE,
  total_assets INTEGER NOT NULL,
  total_liabilities INTEGER NOT NULL,
  net_worth INTEGER NOT NULL,
  total_revenue INTEGER NOT NULL,
  total_expense INTEGER NOT NULL,
  net_income INTEGER NOT NULL,
  roi REAL NOT NULL
);
