-- Create user_logins table
CREATE TABLE user_logins (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  email TEXT,
  login_method TEXT DEFAULT 'google',
  login_time TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create test_attempts table
CREATE TABLE test_attempts (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  test_id TEXT NOT NULL,
  test_title TEXT,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage INTEGER GENERATED ALWAYS AS (ROUND((score::DECIMAL / total_questions) * 100)) STORED,
  time_spent_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create payments table
CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  test_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_method TEXT DEFAULT 'wallet',
  status TEXT DEFAULT 'completed',
  payment_time TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_user_logins_user_id ON user_logins(user_id);
CREATE INDEX idx_user_logins_login_time ON user_logins(login_time);

CREATE INDEX idx_test_attempts_user_id ON test_attempts(user_id);
CREATE INDEX idx_test_attempts_completed_at ON test_attempts(completed_at);
CREATE INDEX idx_test_attempts_test_id ON test_attempts(test_id);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_payment_time ON payments(payment_time);
CREATE INDEX idx_payments_status ON payments(status);

-- Enable Row Level Security (RLS)
ALTER TABLE user_logins ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Disable RLS for now (since using Firebase auth, not Supabase auth)
ALTER TABLE user_logins DISABLE ROW LEVEL SECURITY;
ALTER TABLE test_attempts DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;

-- Create missing tables that the app expects
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  email TEXT,
  name TEXT,
  wallet_balance DECIMAL(10,2) DEFAULT 0,
  tests_taken INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS test_results (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  test_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  questions JSONB,
  price DECIMAL(10,2) DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for new tables
CREATE INDEX idx_profiles_id ON profiles(id);
CREATE INDEX idx_test_results_user_id ON test_results(user_id);
CREATE INDEX idx_test_results_completed_at ON test_results(completed_at);
CREATE INDEX idx_tests_category ON tests(category);
CREATE INDEX idx_tests_published ON tests(published);