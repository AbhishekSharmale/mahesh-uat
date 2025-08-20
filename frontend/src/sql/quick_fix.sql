-- Quick fix for UAT testing - Disable RLS and create missing tables

-- Disable RLS on existing tables
ALTER TABLE user_logins DISABLE ROW LEVEL SECURITY;
ALTER TABLE test_attempts DISABLE ROW LEVEL SECURITY; 
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;

-- Create missing profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  email TEXT,
  name TEXT,
  wallet_balance DECIMAL(10,2) DEFAULT 0,
  tests_taken INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create missing test_results table
CREATE TABLE IF NOT EXISTS test_results (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  test_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create missing tests table
CREATE TABLE IF NOT EXISTS tests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  questions JSONB,
  price DECIMAL(10,2) DEFAULT 0,
  published BOOLEAN DEFAULT true
);

-- Add some demo test data
INSERT INTO tests (id, title, category, price, published) VALUES
('1', 'Free GK Test', 'gk', 0, true),
('2', 'Math Test', 'math', 10, true),
('3', 'Reasoning Test', 'reasoning', 10, true)
ON CONFLICT (id) DO NOTHING;