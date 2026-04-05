# Deploying to GitHub Pages (Vite + React)

Follow these steps to deploy this project to GitHub Pages using the `gh-pages` branch.

## 1) Create a GitHub repository
- Create a new repository on GitHub (public or private).
- Copy its remote URL.

## 2) Update placeholders
- Open `package.json` and set:
  - `"homepage": "https://YOUR_USERNAME.github.io/REPO_NAME"`
- Open `vite.config.js` and set:
  - `base: "/REPO_NAME/"` // Replace REPO_NAME with your repo name

## 3) Push the code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

## 4) Deploy
```bash
npm install
npm run deploy
```
This builds the project and publishes the `dist` folder to the `gh-pages` branch automatically.

## 5) Enable GitHub Pages
- Go to your repo Settings → Pages.
- Set "Branch" to `gh-pages` and "Folder" to `/ (root)` (or defaults used by GitHub).
- Save. Wait a minute for the site to go live at:
`https://YOUR_USERNAME.github.io/REPO_NAME`

---

## Routing note (React Router)
If you are using React Router and see 404s on refresh:
- Option 1 (Recommended for GitHub Pages): use `HashRouter` instead of `BrowserRouter`:
  ```jsx
  import { HashRouter as Router } from 'react-router-dom'
  ```
- Option 2: Keep `BrowserRouter` and ensure you have a `404.html` (copy of `index.html`) in the repo root so GitHub Pages falls back correctly.

This project includes a `404.html` fallback.

---

## Common issues

1) Blank page after deploy
- Ensure `base` in `vite.config.js` is exactly `"/REPO_NAME/"` (with leading and trailing slashes).
- Ensure `homepage` in `package.json` matches your GitHub username and repo name.

2) Assets not loading
- Usually caused by missing/incorrect `base` in Vite. Double-check step (2).

3) Cached old build
- Hard refresh or clear browser cache.
- If needed, bump the site by redeploying: `npm run deploy`.

