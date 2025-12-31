# Supabase Setup Guide for ITCyanbu Platform

This guide will walk you through setting up Supabase for your admin dashboard.

## Step 1: Create Supabase Account & Project

1. **Visit Supabase**
   - Go to https://supabase.com
   - Click "Start your project" or "Sign In"
   - Sign up with GitHub, Google, or email

2. **Create New Project**
   - After signing in, click "New Project"
   - Select or create an organization
   - Fill in project details:
     - **Name**: `itcyanbu-admin` (or any name you prefer)
     - **Database Password**: Choose a strong password (save it)
     - **Region**: Select closest to you (e.g., `Southeast Asia (Singapore)`)
     - **Pricing Plan**: Free (perfect for development)
   - Click "Create new project"
   - Wait ~2 minutes for setup to complete

## Step 2: Get Your API Credentials

1. **Navigate to Project Settings**
   - In your Supabase dashboard sidebar, click the **gear icon** (Settings)
   - Click **API** from the left menu

2. **Copy Your Credentials**
   You'll need two values:
   
   - **Project URL**: 
     - Found under "Project URL" section
     - Format: `https://xxxxxxxxxxxxx.supabase.co`
     - Copy this entire URL
   
   - **anon/public Key**:
     - Found under "Project API keys" section
     - Look for `anon` `public` key
     - Click the **eye icon** to reveal
     - Click **copy** icon
     - This is a long string starting with `eyJ...`

## Step 3: Update Your `.env` File

1. **Open/Create `.env` file**
   - Location: `f:\guh\itcyanbu---all-in-one-software-solutions\.env`
   - If it doesn't exist, create it

2. **Add Supabase Credentials**
   ```env
   # EmailJS Configuration (already exists)
   VITE_EMAILJS_SERVICE_ID=service_p9e2rko
   VITE_EMAILJS_TEMPLATE_ID=template_mlx16q5
   VITE_EMAILJS_PUBLIC_KEY=5PHAz1oJmjWD1mCvx
   
   # Supabase Configuration (ADD THESE)
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZ2hieGlyZGtncGR4eXd2anBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY...
   ```

3. **Replace the placeholder values**
   - Replace `https://xxxxxxxxxxxxx.supabase.co` with YOUR Project URL
   - Replace the long `eyJ...` string with YOUR anon key

## Step 4: Set Up Database Schema

1. **Open SQL Editor in Supabase**
   - In Supabase dashboard sidebar, click **SQL Editor**
   - Click **New Query**

2. **Copy Database Schema**
   - Open `database_schema.sql` in your project
   - Copy the ENTIRE file contents (Ctrl+A, Ctrl+C)

3. **Run the Schema**
   - Paste into the SQL Editor in Supabase
   - Click **Run** (or press Ctrl+Enter)
   - You should see "Success. No rows returned"

4. **Verify Tables Created**
   - Click **Table Editor** in Supabase sidebar
   - You should see these tables:
     - `profiles`
     - `reseller_documents`
     - `licenses`
     - `commissions`

## Step 5: Restart Development Server

1. **Stop Current Server**
   - In your VSCode terminal where `npm run dev` is running
   - Press `Ctrl+C`

2. **Restart Server**
   ```bash
   npm run dev
   ```

3. **Environment Variables are Now Loaded**
   - Vite will read your updated `.env` file
   - Supabase connection is now active

## Step 6: Test the Connection

1. **Open the App**
   - Go to `http://localhost:3002`

2. **Navigate to Settings**
   - Click "Super Admin Login"
   - Enter any credentials (demo mode)
   - Go to `/admin/settings`

3. **Test Connection**
   - Click the **"Test Connection"** button
   - You should see a success toast: "Supabase connection successful!"

4. **Check Live Data**
   - Go to **Dashboard Overview** (`/admin`)
   - Stats should now show `0` (no data yet)
   - This confirms it's connected to Supabase!

## Step 7: Create Your First Admin User (Optional)

1. **Go to Authentication in Supabase**
   - Click **Authentication** in sidebar
   - Click **Users** tab
   - Click **Add User**

2. **Create Super Admin**
   - Email: `admin@itcyanbu.net`
   - Password: (choose a password)
   - Check "Auto Confirm User"
   - Click **Create User**

3. **Set Admin Role**
   - Go to **Table Editor** → `profiles`
   - Click **Insert** → **Insert Row**
   - Set:
     - `id`: Copy the user ID from Authentication page
     - `role`: `super_admin`
     - `email`: `admin@itcyanbu.net`
   - Click **Save**

4. **Log In with Real Account**
   - Go to app login
   - Use your created credentials
   - You'll now be logged in with real Supabase auth!

## Troubleshooting

### "Failed to fetch" or Connection Errors
- Check if `.env` file is in the correct location (project root)
- Verify credentials are correct (no extra spaces)
- Restart development server after changes

### Tables Not Created
- Check SQL Editor for error messages
- Ensure you copied the ENTIRE `database_schema.sql` file
- Check for syntax errors in the SQL

### Still Seeing Mock Data
- Verify `.env` variables start with `VITE_`
- Check browser console (F12) for errors
- Clear browser cache and refresh

## What Happens After Setup?

✅ **SuperAdminHome**: Shows real counts from database  
✅ **License Manager**: Saves licenses to Supabase  
✅ **Document Upload**: Stores files in Supabase Storage  
✅ **Authentication**: Real login system (not demo mode)  
✅ **Reports**: Query real data with filters  

## Security Notes

- Never commit `.env` to Git (it's in `.gitignore`)
- The `anon` key is safe for client-side use
- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data

---

**Need Help?** Check the settings page at `/admin/settings` for:
- Current configuration status
- Connection test button
- Setup instructions

Good luck! 🚀
