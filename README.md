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

When the development server is running, open [`http://localhost:5173/admin`](http://localhost:5173/admin) to use the local editor. It can update profile information, About text, skills, projects, awards, contact details, and images.

The image uploader accepts JPG, PNG, WebP, and GIF files up to 8 MB. Uploaded images are saved in `public/images`, while content changes are written to `src/data/portfolioContent.json`.

The editor is intended for local development only. It writes files through a Vite development-server plugin and is not a hosted CMS. Do not expose the development server publicly or deploy the editor endpoints as a production editing system without adding authentication and a backend.

## Production deployment

Build the site:

```bash
npm run build
```

Deploy the generated `dist` directory to a static hosting provider such as GitHub Pages, Netlify, or Vercel. Run `npm test` before deploying to catch lint and build failures.

For live content editing, connect the portfolio to a hosted CMS or authenticated backend instead of using the local editor.
