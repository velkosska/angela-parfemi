# Angela Parfemi 🌹

Premium perfume ordering website — Next.js + Tailwind.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Product pages

Clicking a perfume opens a full-screen product page at `/parfem/{id}` (e.g. `/parfem/coco-mademoiselle`). The cart works across the home page and product pages.

---

## Order emails

Every order is sent to **parfemiangela@gmail.com**.

### Option A — Resend (easiest for Angela)

1. Sign up at [resend.com](https://resend.com) using **parfemiangela@gmail.com** (not your personal email).
2. Confirm the email, create an **API Key**.
3. Add to `.env` and Vercel:

| Variable | Value |
|----------|--------|
| `RESEND_API_KEY` | API key from Resend |

4. Redeploy.

With a free Resend account, emails can go to **the same address you signed up with** — so `parfemiangela@gmail.com` works without domain setup.

### Option B — Gmail App Password

If you prefer not to use Resend: [App Password](https://myaccount.google.com/apppasswords) on parfemiangela@gmail.com → `GMAIL_USER` + `GMAIL_APP_PASSWORD` in env.

---

## Deploy to Vercel (free)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Add `RESEND_API_KEY` (and optional env vars above)
5. Click Deploy

Your site will be live at `your-project.vercel.app`.
You can add a custom domain in Vercel settings.

---

## Add Real Product Photos

1. Put images in `/public/images/` as `{perfume-id}.jpg`
2. Edit products in `data/products.ts`

---

## Customization

- **Colors**: `app/globals.css`
- **Products**: `data/products.ts`
- **Prices**: `sizes` array per product in `data/products.ts`
- **Phone number**: search for `075 263 594` and replace
- **Order email**: `lib/email.ts` or `ORDER_EMAIL_TO` env var
- **Fonts**: `app/globals.css` and `app/layout.tsx`
