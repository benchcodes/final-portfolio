# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Pag-edit ng portfolio

Patakbuhin ang `npm run dev`, pagkatapos buksan ang `http://localhost:5173/admin`. Gamitin ang form para baguhin ang profile, About, skills, projects, awards, contact details, at photos. Pindutin ang **Save changes** para maisulat ang updates sa project files.

Tumatanggap ang photo uploader ng JPG, PNG, WebP, at GIF hanggang 8 MB. Maaari ka ring mag-paste ng image URL sa path field. Nasa `src/data/portfolioContent.json` ang saved content; nasa `public/images` ang mga in-upload na larawan.

Pagkatapos mag-save, i-deploy ang site para makita ng lahat ang updates. Pang-local development ang editor button; para makapag-edit ng live site mula sa browser, kailangan pang ikonekta ang hosted CMS o backend.
