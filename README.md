# 🛒 বাজার দর — BazarDor

BazarDor is a responsive Bangladeshi market-price web application. It shows
essential product prices, price movement, categories and product details.

## Technologies

- React + Vite
- React Router
- Tailwind CSS
- JavaScript
- React Hot Toast
- Lucide React
- REST API
- Vercel-ready SPA routing

## Key Features

1. Responsive homepage for mobile, tablet and desktop
2. API-powered product list
3. Today's price risers and fallers
4. Category pages with numeric price sorting
5. Product details with protected route
6. Loading skeletons
7. Sign up / sign in / sign out demo flow
8. Google and GitHub login UI placeholders
9. Profile and update-profile routes
10. Bengali number formatting
11. Toast notifications
12. Custom 404 page
13. Vercel SPA refresh configuration
14. Responsive navigation and price ticker

## API

Primary:
https://api.api-store.workers.dev/api/bazardor

Alternative:
https://api.abcz.workers.dev/api/bazardor

Endpoints:
- /products
- /products?category=chal
- /products/:id
- /categories
- /categories/:slug

## Run

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Production build

```bash
npm run build
```

## Important authentication note

This downloadable starter uses a localStorage demo authentication layer so the
project can run immediately with only VS Code and Node.js.

The assignment asks for Better Auth with Google and GitHub. Real Better Auth
requires a server-side setup, database and OAuth client credentials. The Google
and GitHub buttons in this starter are intentionally UI placeholders and should
be connected to the real Better Auth backend before claiming production OAuth
support.

## Deployment

The project contains `vercel.json` for SPA route rewrites. Deploy the project
as a Vite application with:

Build command: npm run build
Output directory: dist
