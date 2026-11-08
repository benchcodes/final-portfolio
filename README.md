# Bench Matthew Culubong - Portfolio

A responsive personal portfolio built with React, Vite, Tailwind CSS, and custom CSS animations. It showcases profile information, skills, projects, awards, and contact details.

## Requirements

- Node.js
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check JavaScript and JSX with ESLint |
| `npm test` | Run lint checks and the production build |

## Updating portfolio content

The portfolio content is stored in [`src/data/portfolioContent.json`](./src/data/portfolioContent.json). Update this file to change:

- Name, role, introduction, and About text
- Skills and projects
- Awards
- Contact details
- Profile and project image paths

### Local portfolio editor

When the development server is running, open [`http://localhost:5173/admin`](http://localhost:5173/admin) to use the local editor. It can update profile information, About text, skills, projects, awards, contact details, and images. The `/admin` route is also handled by the production SPA rewrite so it shows the local-only editor notice instead of a host-level 404 when visited on the deployed site.

The image uploader accepts JPG, PNG, WebP, and GIF files up to 8 MB. Uploaded images are saved in `public/images`, while content changes are written to `src/data/portfolioContent.json`.

The editor uses Supabase Authentication and Storage in production. The legacy Vite file-writing endpoints remain available for local development only; they are not used by the deployed editor.

### Supabase editor setup

The deployed `/admin` editor uses Supabase Authentication, the `portfolio_content` table, and the `portfolio-images` Storage bucket. Copy `.env.example` to `.env.local` and add the Supabase project URL and publishable anon key. Add the same variables in Vercel under **Settings → Environment Variables**, then redeploy.

Sign in at `/admin` with the Supabase user that was added to the `admin_users` table. The public site reads the saved content from Supabase and temporarily uses the bundled JSON content until a valid database record is available.

## Production deployment

Build the site:

```bash
npm run build
```

Deploy the generated `dist` directory to a static hosting provider such as GitHub Pages, Netlify, or Vercel. Run `npm test` before deploying to catch lint and build failures.

For live content editing, connect the portfolio to a hosted CMS or authenticated backend instead of using the local editor.
