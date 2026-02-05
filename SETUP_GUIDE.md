# Quick Setup Guide - Supabase Backend

## ✅ What's Already Done

Your application now has full Supabase backend integration:
- All data contexts migrated (Contacts, Calendars, Appointments)
- Authentication ready (Email/Password + Google OAuth)
- Automatic localStorage → cloud migration
- Dev server running at http://localhost:5173

## ⚠️ Action Required: Database Setup

### Run SQL Schema in Supabase (5 minutes)

1. **Open Supabase Dashboard**
   ```
   https://supabase.com → Your Project
   ```

2. **Go to SQL Editor**
   - Left sidebar → **SQL Editor**
   - Click **New query**

3. **Copy & Run Schema**
   - Open: `supabase/schema.sql` in your project
   - Copy the entire file contents
   - Paste into Supabase SQL Editor
   - Click **Run** (or Ctrl+Enter)

4. **Verify Tables Created**
   - Left sidebar → **Table Editor**
   - Confirm you see: `contacts`, `calendars`, `appointments`, `conversations`, `messages`

✅ **Done!** Your cloud database is ready.

---

## 🧪 Testing

### Test Locally (Without Cloud)
1. Open http://localhost:5173
2. Close the "Sign In" prompt
3. Create contacts → they save to localStorage
4. Refresh page → data persists

### Test With Cloud
1. Click "Sign In" on the banner
2. Create account or sign in
3. Your localStorage data automatically migrates to Supabase!
4. Check Supabase Dashboard → Table Editor → contacts to see your data

---

## 🔐 Optional: Google OAuth Setup

If you want "Sign in with Google":

1. **Supabase**: Authentication → Providers → Enable Google
2. **Google Cloud Console**: Create OAuth credentials
3. **Redirect URI**: `https://[your-project].supabase.co/auth/v1/callback`
4. Paste Client ID & Secret back into Supabase

---

## 📝 Environment Variables

Already configured in `.env.local`:
```env
VITE_SUPABASE_URL=https://tzei3zzmjdmqukkgvdov.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
```

---

## 🎯 Next Steps

1. **Immediate**: Run the SQL schema in Supabase (see above)
2. **Test**: Try creating contacts both with and without authentication
3. **Deploy**: Push to Vercel (environment variables already set)
4. **Optional**: Configure Google OAuth if you want that feature

---

## 📚 Full Documentation

See [walkthrough.md](file:///C:/Users/itc/.gemini/antigravity/brain/1330f0ce-73bb-4d40-b763-fa3102e43e5d/walkthrough.md) for complete technical details.
