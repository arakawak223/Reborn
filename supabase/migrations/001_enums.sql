-- Sport categories
CREATE TYPE sport_category AS ENUM (
  'baseball', 'soccer', 'basketball', 'tennis', 'swimming',
  'track_and_field', 'gymnastics', 'figure_skating', 'rugby',
  'volleyball', 'boxing', 'wrestling', 'skiing'
);

-- Comeback status
CREATE TYPE comeback_status AS ENUM (
  'in_progress', 'completed_success', 'completed_partial', 'retired'
);

-- Story stages
CREATE TYPE story_stage AS ENUM (
  'origin', 'despair', 'void', 'awakening', 'rebirth'
);

-- Body regions (30 regions)
CREATE TYPE body_region AS ENUM (
  'head', 'neck',
  'shoulder_left', 'shoulder_right',
  'upper_arm_left', 'upper_arm_right',
  'elbow_left', 'elbow_right',
  'forearm_left', 'forearm_right',
  'wrist_left', 'wrist_right',
  'hand_left', 'hand_right',
  'chest', 'upper_back', 'lower_back', 'abdomen',
  'hip_left', 'hip_right',
  'thigh_left', 'thigh_right',
  'knee_left', 'knee_right',
  'shin_left', 'shin_right',
  'ankle_left', 'ankle_right',
  'foot_left', 'foot_right'
);

-- Injury types
CREATE TYPE injury_type AS ENUM (
  'tear', 'fracture', 'rupture', 'sprain', 'strain',
  'dislocation', 'inflammation', 'contusion', 'herniation',
  'tendinitis', 'bursitis', 'concussion', 'other'
);

-- Quiz types
CREATE TYPE quiz_type AS ENUM ('serious', 'coffee_break');

-- Financial categories
CREATE TYPE asset_category AS ENUM (
  'background', 'potential', 'support_network',
  'past_achievements', 'mental_resilience', 'financial_backing'
);

CREATE TYPE liability_category AS ENUM (
  'injury_severity', 'absence_duration', 'mental_trauma',
  'age_factor', 'public_pressure', 'skill_atrophy'
);

CREATE TYPE pl_category AS ENUM (
  'rehab_investment', 'mental_energy', 'training_adaptation',
  'post_comeback_value', 'team_relationship', 'fan_engagement'
);
