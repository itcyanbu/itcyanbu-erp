# How to Publish Your ERP Application

Since your project is built with **React** and **Vite**, deploying it is very straightforward. The best and easiest free platforms for hosting this type of application are **Vercel** and **Netlify**.

## Prerequisites
1.  **GitHub Repository**: Ensure your project is pushed to a GitHub repository.
2.  **Environment Variables**: You will need your API keys (e.g., Supabase keys) ready to add to the hosting platform.

---

## Option 1: Deploy to Vercel (Recommended)
Vercel is optimized for frontend frameworks and offers the smoothest experience.

1.  **Create an Account**: Go to [vercel.com](https://vercel.com/signup) and sign up (you can login with GitHub).
2.  **Import Project**:
    *   Click **"Add New..."** -> **"Project"**.
    *   Select your GitHub repository for `itcyanbu`.
3.  **Configure Project**:
    *   **Framework Preset**: It should automatically detect `Vite`.
    *   **Root Directory**: Leave as `./`.
    *   **Build Command**: `npm run build` (default).
    *   **Output Directory**: `dist` (default).
4.  **Environment Variables**:
    *   Open the **"Environment Variables"** section.
    *   Add any keys you have in your local `.env` file (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, or the `GEMINI_API_KEY` seen in your config).
    *   *Note: In Vite, client-side env vars usually start with `VITE_`.*
5.  **Deploy**: Click **"Deploy"**.
    *   Vercel will build your site and give you a live URL (e.g., `https://your-project.vercel.app`) in about a minute.

---

## Option 2: Deploy to Netlify
Netlify is another excellent option for static sites.

1.  **Create an Account**: Go to [netlify.com](https://www.netlify.com/) and sign up.
2.  **Add New Site**:
    *   Click **"Add new site"** -> **"Import an existing project"**.
    *   Choose **GitHub**.
3.  **Select Repository**: Pick your project repo.
4.  **Build Settings**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
5.  **Environment Variables**:
    *   Click on **"Show advanced"** or go to **"Site settings"** after creation to add your environment variables.
6.  **Deploy**: Click **"Deploy site"**.

---

## Option 3: Traditional Hosting (cPanel, Apache, Nginx)
If you have a standard web hosting plan (like GoDaddy, HostGator, etc.):

1.  **Build Locally**:
    Open your terminal in the project folder and run:
    ```bash
    npm run build
    ```
    This will create a `dist` folder in your project directory.

2.  **Upload Files**:
    *   Upload the **contents** of the `dist` folder (index.html, assets folder, etc.) to your server's `public_html` directory using FTP or a File Manager.

3.  **Client-Side Routing Fix**:
    *   Since this is a Single Page Application (SPA), you need to tell your server to redirect all requests to `index.html` so React Router can handle them.
    *   **For Apache/cPanel**: Create a `.htaccess` file in the same folder with this content:
        ```apache
        <IfModule mod_rewrite.c>
          RewriteEngine On
          RewriteBase /
          RewriteRule ^index\.html$ - [L]
          RewriteCond %{REQUEST_FILENAME} !-f
          RewriteCond %{REQUEST_FILENAME} !-d
          RewriteRule . /index.html [L]
        </IfModule>
        ```

## Important Note on Database
Your frontend is deployed separately from your database.
*   **Supabase**: Since you are using Supabase, your database is already in the cloud! You just need to ensure your deployed frontend has the correct `Supabase URL` and `Anon Key` in the environment variables so it can connect.
