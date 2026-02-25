DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');
    END IF;
END 
$$;

-- USER TABLE
CREATE TABLE IF NOT EXISTS users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL CHECK (length(trim(name)) >= 2),
    email       TEXT NOT NULL,
    role        user_role NOT NULL DEFAULT 'USER',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Generiere Einzigartigen Index für E-Mail Kleingeschrieben
-- Wichtig gegen doppelte Registrierungen
CREATE UNIQUE INDEX IF NOT EXISTS user_email_uq ON users (lower(email))