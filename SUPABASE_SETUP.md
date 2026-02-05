# Supabase Setup Guide

Follow these steps to set up your Supabase backend:

## Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or email

## Step 2: Create New Project

1. Click "New Project"
2. Fill in:
   - **Name**: `itcyanbu-contacts` (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine to start
3. Click "Create new project"
4. Wait 1-2 minutes for setup to complete

## Step 3: Get Your API Keys

1. In your Supabase project dashboard, click **Settings** (gear icon on left)
2. Click **API** in the settings menu
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 4: Set Up Environment Variables

Create a file `.env.local` in the project root with:

```env
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual values from Step 3.

## Step 5: Run Database Migrations

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy and paste the SQL from `supabase/schema.sql` (I'll create this file)
4. Click "Run" to execute

## Step 6: Enable Google OAuth (Optional)

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find "Google" and toggle it ON
3. You'll need to create a Google Cloud Project:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret to Supabase

## Step 7: Test Locally

```bash
npm run dev
```

Visit `http://localhost:5173` and try signing up!

## Step 8: Deploy to Vercel

1. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. Redeploy

---

**Need Help?**
- Supabase Docs: https://supabase.com/docs
- Auth Docs: https://supabase.com/docs/guides/auth
