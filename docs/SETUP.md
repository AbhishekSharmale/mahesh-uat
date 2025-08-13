# Quick Setup Guide

## 1. Clone and Install

```bash
cd Police-Bharti-App/frontend
npm install
```

## 2. Environment Setup

Create `.env` file in frontend directory:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## 3. Supabase Setup

### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy URL and anon key to `.env`

### Database Schema
Run this SQL in Supabase SQL Editor:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  wallet_balance INTEGER DEFAULT 0,
  tests_taken INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tests table
CREATE TABLE tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('gk', 'math', 'reasoning', 'marathi')),
  questions JSONB NOT NULL,
  price INTEGER NOT NULL DEFAULT 10,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User tests table
CREATE TABLE user_tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  test_id UUID REFERENCES tests(id) NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  answers JSONB NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, test_id)
);

-- Payments table
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  test_ids JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can view published tests" ON tests FOR SELECT USING (published = true);
CREATE POLICY "Admin can manage tests" ON tests FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.email = 'admin@maheshsharmale.in')
);

CREATE POLICY "Users can view own test results" ON user_tests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own test results" ON user_tests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own payments" ON payments FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Authentication
1. Go to Authentication → Providers
2. Enable Google provider
3. Add Google OAuth credentials

## 4. Sample Data

Run this SQL to add sample tests:

```sql
INSERT INTO tests (title, category, questions, price, published) VALUES
(
  'General Knowledge Test 1',
  'gk',
  '[
    {
      "question": "Who is the current Prime Minister of India?",
      "options": ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Yogi Adityanath"],
      "correct": 0,
      "explanation": "Narendra Modi has been the Prime Minister of India since 2014."
    }
  ]'::jsonb,
  10,
  true
);
```

## 5. Run Development Server

```bash
npm start
```

Visit `http://localhost:3000`

## 6. Admin Access

1. Login with Google using `admin@maheshsharmale.in`
2. Visit `/admin` to manage tests
3. Create and publish tests

## 7. Test Payment (Development)

Use Razorpay test credentials:
- Key ID: Get from Razorpay dashboard
- Test card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

## Production Deployment

See `DEPLOYMENT.md` for complete production setup guide.