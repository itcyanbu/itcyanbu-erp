# 🌐 Google OAuth Setup Guide

To enable Google Login for your app, you need to create "Keys" in Google Cloud and give them to Supabase.

### Step 1: Create a Google Cloud Project
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Click the **Project Dropdown** (top left, next to the logo) and click **New Project**.
3.  Name it `itcyanbu-auth` and click **Create**.

### Step 2: Configure OAuth Consent Screen
1.  In the left sidebar, go to **APIs & Services** > **OAuth consent screen**.
2.  Choose **External** and click **Create**.
3.  **App Information**:
    - **App name**: `itcyanbu`
    - **User support email**: Your email.
    - **Developer contact info**: Your email.
4.  Click **Save and Continue** through the next screens (Scopes and Test Users) until you reach the summary.

### Step 3: Create Login Credentials
1.  Go to **APIs & Services** > **Credentials**.
2.  Click **+ CREATE CREDENTIALS** at the top and choose **OAuth client ID**.
3.  **Application type**: Select **Web application**.
4.  **Authorized redirect URIs**:
    - Click **+ ADD URI**.
    - Go to your **Supabase Dashboard** > **Authentication** > **Providers** > **Google**.
    - Find the **Redirect URI** provided by Supabase (it looks like `https://xxx.supabase.co/auth/v1/callback`).
    - **Copy it** and paste it into the Google Cloud box.
5.  Click **Create**.

### Step 4: Link to Supabase
1.  A window will pop up in Google Cloud with your **Client ID** and **Client Secret**.
2.  **Copy them** and go back to your **Supabase Google Provider** settings.
3.  Paste the **Client ID** and **Client Secret** into the boxes.
4.  Click **Save** in Supabase.

---
**Done!** Now your Google Login button will work perfectly. 🚀
