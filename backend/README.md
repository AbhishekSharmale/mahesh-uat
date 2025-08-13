# Backend Setup - Supabase Configuration

## Database Schema

### 1. Create Tables

Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

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
```

### 2. Row Level Security Policies

```sql
-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Tests policies
CREATE POLICY "Anyone can view published tests" ON tests
  FOR SELECT USING (published = true);

CREATE POLICY "Admin can manage tests" ON tests
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.email = 'admin@maheshsharmale.in'
    )
  );

-- User tests policies
CREATE POLICY "Users can view own test results" ON user_tests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own test results" ON user_tests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments" ON payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 3. Functions

```sql
-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

## Authentication Setup

### 1. Enable Google OAuth
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Client ID: Get from Google Cloud Console
   - Client Secret: Get from Google Cloud Console
   - Redirect URL: `https://your-project.supabase.co/auth/v1/callback`

### 2. Configure Site URL
- Site URL: `http://localhost:3000` (development)
- Additional redirect URLs: `http://localhost:3000/dashboard`

## Sample Data

### Insert Sample Tests

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
    },
    {
      "question": "What is the capital of Maharashtra?",
      "options": ["Pune", "Nagpur", "Mumbai", "Nashik"],
      "correct": 2,
      "explanation": "Mumbai is the capital and largest city of Maharashtra."
    }
  ]'::jsonb,
  10,
  true
);
```

## Environment Variables

Create `.env` file in frontend:
```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_RAZORPAY_KEY_ID=your-razorpay-key
```

## Deployment

### Cloudflare Pages
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Build output directory: `build`
4. Environment variables: Add your Supabase and Razorpay keys

### Custom Domain
1. Add `maheshsharmale.in` to Cloudflare Pages
2. Configure DNS records
3. Enable SSL/TLS