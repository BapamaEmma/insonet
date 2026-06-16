# Deploy INSONET to Hostinger `public_html`

**Go-live checklist:** [HOSTINGER_DEPLOY_NOW.md](./HOSTINGER_DEPLOY_NOW.md)

Use this guide if you want to host the site on **normal Hostinger shared hosting** by uploading files to **`public_html`** (alongside or instead of an existing PHP/WordPress site).

This is a **static build** of the React site. It works without Node.js.

## What works on `public_html`

- Homepage, projects, services pages, navigation
- Site content from `content.json`
- Contact form via PHP (`contact.php`)

## What does **not** work on `public_html`

- CMS admin at `/admin` (no Node.js backend)
- Live content editing on the server — you change content locally, rebuild, and re-upload

For full CMS + Node API, see [HOSTINGER.md](./HOSTINGER.md) (Business/Cloud Node.js hosting).

---

## Build the upload folder

On your Mac:

```bash
cd /Users/gadgetvilla/insonet
npm install
npm run build:public_html
```

This creates a **`public_html/`** folder in the project with everything ready to upload.

---

## Upload to Hostinger

1. Log in to **hPanel**
2. Open **Files → File Manager**
3. Go to **`public_html`** for your domain
4. **Back up** any existing site files first
5. Upload **all files and folders inside** your local `public_html/` folder:
   - `index.html`
   - `.htaccess`
   - `contact.php`
   - `content.json`
   - `assets/` (entire folder)

Do **not** upload the local `public_html` folder itself — upload its **contents**.

---

## Contact form email

Edit `contact.php` on the server (or before upload) and set:

```php
$NOTIFY_EMAIL = "info@insonetgh.com";
$FROM_EMAIL = "noreply@insonetgh.com";
```

Use a `@yourdomain.com` address that exists in your Hostinger email account.

---

## Updating content later

1. Edit content in the project (or via local dev + CMS if you still use Node locally)
2. Run `npm run build:public_html` again
3. Re-upload changed files (at minimum `content.json`, `index.html`, and `assets/` if JS/CSS changed)

---

## Safest way to replace your old site (no destruction)

Follow this order so you can **roll back** if anything goes wrong.

### Phase 1 — Backup (do this first)

1. **hPanel → Backups** — create or download a full website backup if your plan includes it.
2. **File Manager → `public_html`** — select all → **Compress** → download the ZIP to your Mac.  
   Name it something like `old-site-backup-2026-06-16.zip`.
3. **If the old site is WordPress** — also export the database:  
   **hPanel → Databases → phpMyAdmin** → Export the WordPress database → save the `.sql` file.
4. **Note what else lives in `public_html`** — extra folders, `.htaccess`, email forms, old `assets/`, etc. You may need paths or emails from the old site.

Do not skip backups. This is your undo button.

### Phase 2 — Test the new site before touching the live domain

**Option A (best):** Create a subdomain in hPanel, e.g. `preview.yourdomain.com`, and upload the new `public_html/` contents to **that** subdomain’s folder only. Check every page, links, images, and the contact form.

**Option B:** On your Mac:
```bash
npm run build:public_html
npm run serve
```
Open http://127.0.0.1:4173 and click through the site (contact form still needs PHP on the server to work in production).

### Phase 3 — Swap on the main domain (safe method)

Instead of deleting the old site, **rename** it:

1. In File Manager, inside the domain’s root (often `domains/yourdomain.com/`):
   - Rename `public_html` → `public_html_OLD_backup`
2. Create a **new empty** folder named `public_html`
3. Upload **all contents** of your local `public_html/` build into the new `public_html`:
   - `index.html`, `.htaccess`, `contact.php`, `content.json`, `assets/`, `uploads/`
4. Edit `contact.php` with the correct `$NOTIFY_EMAIL` and `$FROM_EMAIL`
5. In hPanel, confirm **SSL (HTTPS)** is still active for the domain

### Phase 4 — Verify (before you delete anything)

Open **https://yourdomain.com** and check:

- [ ] Homepage loads with images and styles
- [ ] `/projects` and service pages work (no 404)
- [ ] Navigation and footer links work
- [ ] Contact form sends (or shows a clear error you can fix)
- [ ] Mobile layout looks correct
- [ ] Old bookmarks still work or redirect as expected

### Phase 5 — Rollback (if needed)

If something is wrong:

1. Delete or rename the new `public_html`
2. Rename `public_html_OLD_backup` back to `public_html`
3. Your old site is live again within minutes

Keep `public_html_OLD_backup` and your downloaded ZIP for **at least 2–4 weeks** before deleting.

### Phase 6 — Clean up (only when you’re happy)

After the new site has run smoothly:

- Delete `public_html_OLD_backup` on the server (optional)
- Keep the ZIP backup on your Mac or cloud storage

### What not to do

- Do **not** delete old files before a backup and a test
- Do **not** open the site via `file://` — always use `https://yourdomain.com`
- Do **not** upload only `index.html` — upload the full `assets/` folder and `.htaccess`

---

## Hosting alongside an existing site

| Goal | Approach |
|------|----------|
| **Replace** the current main site | Back up old `public_html`, then upload the new files |
| **Keep old site on main domain** | Put INSONET in a subfolder, e.g. `public_html/insonet/` — requires extra Vite `base` config (ask if you need this) |
| **Use a subdomain** | Create `app.yourdomain.com` in hPanel and upload to that subdomain’s `public_html` |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank page | Make sure you uploaded to `public_html` and open `https://yourdomain.com`, not `file://` |
| `/projects` shows 404 | Ensure `.htaccess` was uploaded (enable “show hidden files” in File Manager) |
| Contact form fails | Check `contact.php` emails; confirm PHP mail is enabled on Hostinger |
| Images missing | Upload the full `assets/images/` folder |

---

## Quick test before upload

```bash
npm run build:public_html
npm run serve
```

Open http://127.0.0.1:4173 — note: contact form needs PHP on the server to work in production.
