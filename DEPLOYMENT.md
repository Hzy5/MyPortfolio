# Deploying Your Portfolio

Your portfolio is a static site (Vite + React). Here are the easiest ways to go live—all have **free tiers**.

---

## Option 1: Vercel (Recommended)

**Best for:** Easiest setup, automatic deployments from Git.

### Steps:

1. **Push your code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/Hzy5/your-repo-name.git
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub.

3. **Import your repository**:
   - Click "Add New" → "Project"
   - Select your portfolio repo
   - Vercel auto-detects Vite—no config needed
   - Click "Deploy"

4. **Done!** You'll get a URL like `your-project.vercel.app`. You can add a custom domain later.

---

## Option 2: Netlify

**Best for:** Simple drag-and-drop or Git deployment.

### Steps:

1. **Build your site locally**:
   ```bash
   npm run build
   ```
   This creates a `dist` folder.

2. **Go to [netlify.com](https://netlify.com)** and sign in.

3. **Deploy**:
   - **Option A (Drag & Drop):** Drag the `dist` folder onto Netlify's deploy zone
   - **Option B (Git):** Connect your GitHub repo—Netlify will build and deploy automatically

4. The `_redirects` file in `public/` is already set up for React Router.

---

## Option 3: GitHub Pages

**Best for:** Free hosting if your repo is on GitHub.

### Steps:

1. **Add the base path** to `vite.config.ts` (for GitHub Pages):
   ```ts
   base: '/your-repo-name/',  // e.g. '/MyPortfolio/'
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add to `package.json`**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in your repo: **Settings → Pages → Source: gh-pages branch**

---

## Before You Deploy

1. **Test the build**:
   ```bash
   npm run build
   npm run preview
   ```
   Visit `http://localhost:4173` to preview the production build.

2. **Note on screenshots:** The App Store, Play Store, and vesselhealth.com proxies only work in dev. In production:
   - **App Store** (iTunes API) works—it allows CORS
   - **Play Store** and **vesselhealth.com** screenshots may not load due to CORS. If needed, you can add serverless proxy functions on Vercel/Netlify later.

---

## Custom Domain (Optional)

- **Vercel:** Project Settings → Domains → Add your domain
- **Netlify:** Domain Settings → Add custom domain
- Both offer free SSL (HTTPS).
