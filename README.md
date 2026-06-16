# INSONET

React + Vite marketing site with an Express API (contact form, CMS admin, uploads).

## Setup

```bash
npm install
npm run setup:deps   # if preflight asks for shared deps
```

## Development

Run the frontend and API together:

```bash
npm run dev:all
```

Open **http://localhost:5173**

Frontend only:

```bash
npm run dev
```

## View the production build (after `npm run build`)

**Do not open `dist/index.html` directly in the browser** (`file://`). The build uses absolute asset paths and ES modules, which browsers block or fail to load from the filesystem—you will see a blank page.

Instead, serve `dist/` over HTTP:

```bash
npm run serve
```

This runs `vite build`, then starts a local preview server. Open **http://localhost:4173**

To preview an existing build without rebuilding:

```bash
npm run preview
```

## Production (site + API)

```bash
npm run build
npm run start
```

Open **http://localhost:3001** (or the port set in `.env` as `PORT`).

## Deploy on Hostinger

### Option A — `public_html` (shared hosting)

Upload a static build to **`public_html`**. No Node.js required.

```bash
npm run build:public_html
```

See **[PUBLIC_HTML.md](./PUBLIC_HTML.md)** for upload steps, contact form setup, and what is/is not included.

**Ready to deploy now?** Follow **[HOSTINGER_DEPLOY_NOW.md](./HOSTINGER_DEPLOY_NOW.md)** (checklist for hPanel).

```bash
npm run build:public_html          # build + verify
npm run package:hostinger-upload   # also create hostinger-upload.zip
```

### Option B — Node.js Web App (full CMS + API)

Requires Hostinger **Business** or **Cloud** plan.

See **[HOSTINGER.md](./HOSTINGER.md)** for Node.js deployment.

## Other commands

| Command | Description |
|---------|-------------|
| `npm run dev:server` | API only |
| `npm run seed` | Seed CMS content |
| `npm run lint` | Run ESLint |
