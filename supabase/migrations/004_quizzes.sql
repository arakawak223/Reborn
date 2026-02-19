CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  quiz_type quiz_type NOT NULL,
  stage story_stage,
  difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 3),
  question_text TEXT NOT NULL,
  choices TEXT[] NOT NULL,
  correct_index INTEGER NOT NULL CHECK (correct_index BETWEEN 0 AND 3),
  rationale TEXT NOT NULL,
  encouragement TEXT NOT NULL
);

CREATE INDEX idx_quiz_athlete_type ON quiz_questions(athlete_id, quiz_type);
