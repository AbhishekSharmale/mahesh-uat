# Deployment Guide

## Prerequisites
- Supabase account
- Cloudflare account
- GitHub repository
- Google Cloud Console project (for OAuth)
- Razorpay account

## Step 1: Supabase Setup

### 1.1 Create Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note down your project URL and anon key

### 1.2 Database Setup
1. Go to SQL Editor in Supabase dashboard
2. Run the SQL commands from `backend/README.md`
3. Create tables, policies, and functions

### 1.3 Authentication Setup
1. Go to Authentication → Providers
2. Enable Google provider
3. Add Google OAuth credentials:
   - Client ID: From Google Cloud Console
   - Client Secret: From Google Cloud Console
4. Set Site URL: `https://maheshsharmale.in/app`
5. Add redirect URLs: `https://maheshsharmale.in/app/dashboard`

## Step 2: Google OAuth Setup

### 2.1 Google Cloud Console
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`

## Step 3: Razorpay Setup

### 3.1 Account Setup
1. Create account at [razorpay.com](https://razorpay.com)
2. Complete KYC verification
3. Get API keys from Dashboard → Settings → API Keys
4. Note down Key ID and Key Secret

### 3.2 Webhook Setup (Optional)
1. Go to Settings → Webhooks
2. Add webhook URL: `https://your-project.supabase.co/functions/v1/razorpay-webhook`
3. Select events: payment.captured, payment.failed

## Step 4: Frontend Deployment

### 4.1 Environment Variables
Create `.env` file:
```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_RAZORPAY_KEY_ID=your-razorpay-key-id
```

### 4.2 Cloudflare Pages
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Pages → Create a project
3. Connect to Git → Select your repository
4. Build settings:
   - Framework preset: Create React App
   - Build command: `npm run build`
   - Build output directory: `build`
5. Environment variables: Add all variables from `.env`
6. Deploy

### 4.3 Custom Domain
1. Go to Pages → Your project → Custom domains
2. Add domain: `maheshsharmale.in`
3. Add subdomain: `app.maheshsharmale.in` (optional)
4. Configure DNS records in Cloudflare DNS

## Step 5: Sample Data

### 5.1 Insert Test Data
1. Go to Supabase SQL Editor
2. Run commands from `backend/sample-data.sql`
3. This will create 4 sample tests

### 5.2 Create Admin User
1. Visit your deployed app
2. Login with Google using `admin@maheshsharmale.in`
3. Go to Supabase → Authentication → Users
4. Find your user and copy the UUID
5. Update the admin profile in SQL Editor

## Step 6: Testing

### 6.1 User Flow
1. Visit your app
2. Login with Google
3. Browse tests
4. Purchase a test (use test payment)
5. Take the test
6. View results

### 6.2 Admin Flow
1. Login as admin
2. Go to `/admin`
3. Create new tests
4. Manage users
5. View statistics

## Step 7: Production Checklist

- [ ] SSL certificate enabled
- [ ] Custom domain configured
- [ ] Google OAuth working
- [ ] Razorpay payments working
- [ ] Database policies tested
- [ ] Admin access restricted
- [ ] Sample tests loaded
- [ ] Mobile responsiveness tested
- [ ] Performance optimized

## Monitoring

### Analytics
- Add Google Analytics to track user behavior
- Monitor conversion rates
- Track popular test categories

### Error Tracking
- Add Sentry for error monitoring
- Monitor Supabase logs
- Set up alerts for payment failures

## Maintenance

### Regular Tasks
- Monitor database performance
- Update test content
- Review user feedback
- Analyze payment success rates
- Update dependencies

### Scaling
- Monitor Supabase usage limits
- Consider CDN for static assets
- Optimize database queries
- Add caching if needed

## Support

### User Support
- Add contact form
- Create FAQ section
- Monitor user feedback
- Provide email support

### Technical Support
- Monitor error logs
- Set up health checks
- Create backup procedures
- Document troubleshooting steps