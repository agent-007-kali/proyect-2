-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: subscriptions
-- Tracks user subscription status and plan
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active', -- 'active' or 'past_due'
    plan TEXT DEFAULT 'premium_50',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: monitoring_jobs
-- Stores competitor URLs and report history for each user
CREATE TABLE IF NOT EXISTS monitoring_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email TEXT REFERENCES subscriptions(user_email),
    url_1 TEXT,
    url_2 TEXT,
    url_3 TEXT,
    last_content_hash TEXT, -- To detect if anything changed
    latest_report TEXT,      -- The last AI report generated
    last_check_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_email)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_monitoring_jobs_active ON monitoring_jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_subscriptions_email_lookup ON subscriptions(user_email);
