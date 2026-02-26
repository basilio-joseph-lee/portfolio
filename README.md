# Basilio Joseph Lee — Portfolio

A modern, dark-themed developer portfolio built with **Next.js 14** and **Tailwind CSS**.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Fonts**: Syne, DM Sans, JetBrains Mono (Google Fonts)
- **Deployment**: Vercel

## 🌐 Deploy to Vercel

### Option 1 — Vercel CLI (fastest)
```bash
npm i -g vercel
vercel
```
Follow the prompts. Done!

### Option 2 — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Your site is live in ~60 seconds ✅

### Option 3 — GitHub Actions CI/CD
You can add a `.github/workflows/deploy.yml` to auto-deploy on every push to `main`.

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

> Add `VERCEL_TOKEN`, `ORG_ID`, `PROJECT_ID` as GitHub secrets.

## 🖼️ Adding Your Photo
Replace the emoji avatar in `components/About.tsx` with:
```tsx
import Image from "next/image";
// ...
<Image src="/your-photo.jpg" alt="Basilio Joseph Lee" fill className="object-cover" />
```
Put your photo in the `/public` folder.

## 📝 Customizing
- **Projects**: Edit the `projects` array in `components/Projects.tsx`
- **Skills**: Edit `skillGroups` in `components/Skills.tsx`
- **Experience**: Edit the `experiences` array in `components/Experience.tsx`
- **Colors**: Edit CSS variables in `app/globals.css`
