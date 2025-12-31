# How to Push Your Project to GitHub

It appears that **Git is not currently installed** or recognized on your computer. You will need to install it first to send your project to GitHub.

## Step 1: Install Git
1.  Download Git for Windows: [https://git-scm.com/download/win](https://git-scm.com/download/win)
2.  Run the installer. You can use the default settings (just click "Next" through the options).
3.  **Important**: After installing, you may need to restart your computer or at least restart your terminal/VS Code for the command to work.

## Step 2: Create a Repository on GitHub
1.  Log in to [GitHub.com](https://github.com).
2.  Click the **+** icon in the top right and select **New repository**.
3.  Name your repository (e.g., `itc-crm-erp`).
4.  Make it **Public** or **Private** (Private is safer for business projects).
5.  Do **NOT** check "Initialize with a README" or "Add .gitignore" (since you already have code).
6.  Click **Create repository**.

## Step 3: Connect and Push Your Code
Once Git is installed and you have restarted your terminal, run these commands inside your project folder:

1.  **Initialize Git:**
    ```bash
    git init
    ```

2.  **Add your files:**
    ```bash
    git add .
    ```

3.  **Commit your changes:**
    ```bash
    git commit -m "Initial commit of CRM system"
    ```

4.  **Link to GitHub** (Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with yours):
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    ```

5.  **Push to GitHub:**
    ```bash
    git branch -M main
    git push -u origin main
    ```

## Step 4: Verify
Refresh your GitHub repository page. You should see all your files listed there!
