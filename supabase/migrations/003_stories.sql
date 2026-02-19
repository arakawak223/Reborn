CREATE TABLE story_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  stage story_stage NOT NULL,
  stage_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  year_start INTEGER,
  year_end INTEGER,
  UNIQUE(athlete_id, stage)
);

CREATE TABLE sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  author TEXT,
  publisher TEXT,
  url TEXT,
  published_date DATE
);

CREATE TABLE testimonies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_id UUID NOT NULL REFERENCES story_stages(id) ON DELETE CASCADE,
  speaker_name TEXT NOT NULL,
  speaker_role TEXT NOT NULL,
  quote TEXT NOT NULL,
  source_id UUID REFERENCES sources(id) ON DELETE SET NULL
);

CREATE TABLE stage_sources (
  stage_id UUID NOT NULL REFERENCES story_stages(id) ON DELETE CASCADE,
  source_id UUID NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  PRIMARY KEY (stage_id, source_id)
);
