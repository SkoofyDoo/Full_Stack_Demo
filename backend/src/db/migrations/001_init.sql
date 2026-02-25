CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- MIGRAION TABLE: Für spätere Versionierung und Nachvollziehbarkeit
CREATE TABLE IF NOT EXISTS migrations(
    filename    TEXT PRIMARY KEY,
    applied_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);