# Brauerei Andermatt Website

A minimalist, responsive single-page application for the Brauerei Andermatt microbrewery.

## Features
- **Mobile-First Design:** Optimized for phones, works great on desktop.
- **Lightweight:** Built with React and Tailwind CSS via CDN (no heavy build steps required for quick editing).
- **Contact Form Integration:** Connects directly to Google Sheets via Google Apps Script.
- **Content:** Fully customizable via `constants.ts`.

## Setup Instructions

### 1. Frontend Configuration
1. Open `components/ContactForm.tsx`.
2. Find the constant `GAS_URL`.
3. Replace the placeholder URL with your deployed Google Apps Script Web App URL (see below).

### 2. Google Apps Script (Backend)
1. Go to Google Sheets and create a new sheet named "Brauerei Andermatt - Contact Form".
2. Go to **Extensions** > **Apps Script**.
3. Clear existing code and copy the content from `backend/code.gs` into `Code.gs`.
4. Update the `TO_EMAIL` variable at the top of the script to your actual email address.
5. Click **Deploy** > **New Deployment**.
6. Select type: **Web App**.
7. Configuration:
   - **Description:** Contact Form Endpoint
   - **Execute as:** Me (your account)
   - **Who has access:** **Anyone** (Crucial: Must be "Anyone" for the form to work publicly).
8. Click **Deploy**.
9. Copy the "Web App URL" provided and paste it into `ContactForm.tsx`.

### 3. Customizing Content
- **Text & Data:** Edit `constants.ts` to change beers, partners, diary entries, or FAQ items.
- **Images:** The app currently uses placeholder images (Picsum). Replace image `src` URLs in `App.tsx` with your real asset URLs.
- **Colors & Fonts:** Defined in `index.html` within the `tailwind.config` script tag.

## SEO
- The `index.html` file includes JSON-LD Schema for "Brewery" and Open Graph tags. Update the `meta` tags if your domain changes.