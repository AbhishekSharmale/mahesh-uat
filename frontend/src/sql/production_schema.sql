-- Production Schema with Firebase Auth Integration

-- Create custom auth function for Firebase users
CREATE OR REPLACE FUNCTION auth.firebase_uid() RETURNS TEXT AS $$
  SELECT current_setting('request.jwt.claims', true)::json->>'sub'
$$ LANGUAGE sql STABLE;

-- Create all required tables
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  email TEXT,
  name TEXT,
  wallet_balance DECIMAL(10,2) DEFAULT 0,
  tests_taken INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_mr TEXT,
  category TEXT NOT NULL,
  questions JSONB,
  price DECIMAL(10,2) DEFAULT 0,
  published BOOLEAN DEFAULT true,
  is_free BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
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

CREATE TABLE IF NOT EXISTS user_logins (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  email TEXT,
  login_method TEXT DEFAULT 'google',
  login_time TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS test_attempts (
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

CREATE TABLE IF NOT EXISTS payments (
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_id ON profiles(id);
CREATE INDEX IF NOT EXISTS idx_tests_category ON tests(category);
CREATE INDEX IF NOT EXISTS idx_tests_published ON tests(published);
CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_test_results_completed_at ON test_results(completed_at);
CREATE INDEX IF NOT EXISTS idx_user_logins_user_id ON user_logins(user_id);
CREATE INDEX IF NOT EXISTS idx_user_logins_login_time ON user_logins(login_time);
CREATE INDEX IF NOT EXISTS idx_test_attempts_user_id ON test_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_test_attempts_completed_at ON test_attempts(completed_at);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_logins ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Tests table is public (no RLS needed)
ALTER TABLE tests DISABLE ROW LEVEL SECURITY;

-- Create RLS policies for authenticated users
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can view own test results" ON test_results
  FOR SELECT USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own test results" ON test_results
  FOR INSERT WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can view own logins" ON user_logins
  FOR SELECT USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own logins" ON user_logins
  FOR INSERT WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can view own test attempts" ON test_attempts
  FOR SELECT USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own test attempts" ON test_attempts
  FOR INSERT WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own payments" ON payments
  FOR INSERT WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Insert demo test data
INSERT INTO tests (id, title, title_mr, category, price, published, is_free, questions) VALUES
('1', 'Free General Knowledge Test', 'मोफत सामान्य ज्ञान चाचणी', 'gk', 0, true, true, '[
  {
    "question": "Who was the first President of India?",
    "options": ["Dr. Rajendra Prasad", "Dr. A.P.J. Abdul Kalam", "Dr. Sarvepalli Radhakrishnan", "Zakir Hussain"],
    "correct": 0,
    "explanation": "Dr. Rajendra Prasad was the first President of India."
  },
  {
    "question": "The capital of Maharashtra is?",
    "options": ["Pune", "Nagpur", "Mumbai", "Nashik"],
    "correct": 2,
    "explanation": "Mumbai is the capital of Maharashtra."
  }
]'::jsonb),
('2', 'Mathematics Test', 'गणित चाचणी', 'math', 10, true, false, '[
  {
    "question": "What is 15% of 200?",
    "options": ["25", "30", "35", "40"],
    "correct": 1,
    "explanation": "15% of 200 = (15/100) × 200 = 30"
  }
]'::jsonb),
('3', 'Reasoning Test', 'तर्कशुद्धता चाचणी', 'reasoning', 10, true, false, '[
  {
    "question": "If BOOK is coded as CPPL, then WORD is coded as:",
    "options": ["XPSE", "XQSE", "YPSE", "XPSD"],
    "correct": 0,
    "explanation": "Each letter is shifted by +1 in the alphabet."
  }
]'::jsonb)
ON CONFLICT (id) DO NOTHING;