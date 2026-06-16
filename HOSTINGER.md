# Deploy INSONET on Hostinger (alongside an existing site)

This project is **not** a static HTML site. It includes:

- React frontend (built to `dist/`)
- Node.js API (`/api/*`) — contact form, CMS admin, uploads
- File storage (`server/data/`, `server/uploads/`)

You must use **Hostinger Node.js Web App hosting** (Business or Cloud plan). Opening `dist/index.html` or uploading only HTML/CSS to `public_html` will **not** run the API or admin panel.

Official Hostinger guide: [Deploy a Node.js website](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)


## Running alongside your current website

Hostinger treats a Node.js app as its **own website**. You usually cannot mix a PHP/WordPress site and this Node app in the same `public_html` folder.

Pick one of these setups:

| Setup | Best for |
|-------|----------|
| **Subdomain** — e.g. keep the old site on `www.yourdomain.com`, deploy INSONET on `app.yourdomain.com` | Testing before go-live; keeping both live |
| **Swap domains** — deploy INSONET on the main domain after backing up the old site | Replacing the old site when ready |
| **Addon domain** — second domain on the same Hostinger account | Old brand on one domain, INSONET on another |

**Recommended:** Deploy to a **subdomain first** (e.g. `app.insonetgh.com`), test everything, then point the main domain to the new app when you are ready.

---

## Before you deploy

1. **Upgrade** to Hostinger **Business** or **Cloud** (Node.js Web Apps).
2. **Back up** your existing website (Hostinger backup or download files + database).
3. In hPanel, add a **subdomain** if you are keeping the current site on the main domain:
   - **Domains → Subdomains → Create** (e.g. `app`)

---

## Deploy via hPanel (ZIP upload)

### 1. Prepare the project on your Mac

```bash
cd /Users/gadgetvilla/insonet
npm install
npm run build
npm run serve   # optional: test at http://127.0.0.1:4173
```

Create a ZIP of the project **without** `node_modules` or `.env`:

```bash
zip -r insonet-deploy.zip . \
  -x "node_modules/*" \
  -x ".git/*" \
  -x ".env" \
  -x "*.DS_Store"
```

Hostinger will run `npm install` and the build on their servers. Including `dist/` in the ZIP is optional (build runs again on deploy).

### 2. Add the Node.js website in hPanel

1. Log in to **hPanel**
2. **Websites → Add Website**
3. Choose **Node.js Web App**
4. Connect **GitHub** (recommended for updates) or **upload** `insonet-deploy.zip`
5. Select the domain or subdomain for this app

### 3. Build settings

If Hostinger does not auto-detect correctly, use:

| Setting | Value |
|---------|--------|
| **Node.js version** | 20.x or 22.x |
| **Install command** | `npm install` |
| **Build command** | `npm run build` |
| **Start command** | `npm start` |
| **Entry file** | `server/index.js` |

The `npm start` script runs the Express server, which serves the built React app from `dist/` and handles `/api` routes.

---

## Environment variables (hPanel → Website → Environment variables)

Set these in the Node.js app dashboard — **do not** upload `.env` to GitHub.

```env
NODE_ENV=production
PORT=3001
JWT_SECRET=use-a-long-random-secret-here
ADMIN_EMAIL=admin@insonetgh.com
ADMIN_PASSWORD=use-a-strong-password

CONTACT_NOTIFY_EMAIL=info@insonetgh.com
SMTP_HOST=mail.insonetgh.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@insonetgh.com
SMTP_PASS=your-mailbox-password
SMTP_FROM="INSONET Website" <info@insonetgh.com>
```

Use your **Hostinger email** SMTP details from **Emails → Manage → Configuration**:

- Host: `mail.yourdomain.com`
- Port: **465** (SSL) or **587** (TLS)

After changing env vars, click **Restart** in the Node.js dashboard.

---

## After deploy — check these URLs

Replace `https://app.insonetgh.com` with your actual domain/subdomain.

| URL | Expected |
|-----|----------|
| `/` | Homepage loads |
| `/projects` | Projects page |
| `/admin` | CMS login |
| `/api/health` | `{"status":"ok","service":"insonet-cms"}` |

---

## CMS admin

- URL: `https://your-domain/admin`
- Login: `ADMIN_EMAIL` / `ADMIN_PASSWORD` from environment variables
- Change the default password immediately after first login (update env var in hPanel and restart)

Content and uploads are stored on the server in:

- `server/data/content.json` — CMS content
- `server/uploads/` — uploaded media

Back these up from Hostinger File Manager or SFTP if you migrate servers.

---

## Switching the main domain to INSONET later

1. Back up the old site.
2. In hPanel, remove or repoint the old website on the main domain (Hostinger may require removing the old site before attaching Node.js to that domain — see their docs).
3. Deploy INSONET on the main domain, or change DNS/domain assignment to point to the Node.js app.
4. Enable **SSL** (Let’s Encrypt) for the domain in hPanel.

---

## Deploy updates

**GitHub (recommended):** Push to the connected branch — Hostinger rebuilds automatically.

**ZIP:** Upload a new archive and redeploy from the website dashboard.

Always run locally first:

```bash
npm run build
npm run serve
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank white page | Do not use `file://`. Site must be served over `https://`. Check build logs in hPanel. |
| `503 Site build missing` | Build failed — check build command and logs; ensure `npm run build` completes. |
| Contact form does not email | Set SMTP env vars; use Hostinger mailbox credentials; restart app. |
| `/api/health` 404 | App not running as Node.js — you may have uploaded static files only. |
| Old site still shows | DNS/cache — wait for propagation; clear browser cache; confirm domain points to the Node.js website. |

---

## If you only have basic shared hosting (no Node.js)

You can upload **only** the static `dist/` folder to `public_html`, but you will **lose**:

- CMS admin (`/admin`)
- Contact form API
- Dynamic content from `content.json`
- Media uploads

To get the full site, upgrade to **Business/Cloud** and deploy as a Node.js Web App.
