# ICS TravelGroup Portal

Internal company portal for ICS TravelGroup, built with Vue 3 + Vite + Tailwind CSS.

---

## Overview

A centralized hub for company-wide resources including announcements, SOPs, IT guides, product catalog, sales materials, and image gallery. Designed to serve staff across all ICS countries from a single platform.

---

## Tech Stack

- Vue 3 (Composition API)
- Vite
- Tailwind CSS v3
- Vue Router 4
- localStorage for client-side data persistence

---

## Project Structure

```
src/
├── components/
│   └── Navbar.vue
├── data/
│   ├── announcements.json
│   ├── files.json
│   ├── itguide.json
│   ├── sops.json
│   └── misc.json           # products, sales materials, gallery
├── pages/
│   ├── Home.vue
│   ├── FileLibrary.vue
│   ├── Announcements.vue
│   ├── ITGuide.vue
│   ├── SOPs.vue
│   ├── ProductCatalog.vue
│   ├── SalesMaterials.vue
│   └── ImageGallery.vue
├── router/
│   └── index.js
├── App.vue
├── main.js
└── style.css
```

---

## Pages

| Page | Path | Description |
|---|---|---|
| Home | `/` | Portal front door with announcements, quick access, and country file access |
| File Library | `/files` | Placeholder for Google Shared Drive integration |
| Announcements | `/announcements` | View and add company announcements (persisted via localStorage) |
| IT Guide | `/it-guide` | Expandable IT documentation and system guides |
| SOPs | `/sops` | View and add standard operating procedures (persisted via localStorage) |
| Product Catalog | `/products` | Tour packages filtered by country |
| Sales Materials | `/sales` | File listing for sales decks, templates, and rate sheets |
| Image Gallery | `/gallery` | Destination photos filtered by country |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Data

All data is stored as static JSON files under `src/data/`. For pages with add functionality (Announcements, SOPs), new entries are persisted in the browser's localStorage and merged with the base JSON on load.

To reset to default data, clear localStorage in the browser developer tools.

---

## File Library

The File Library page currently shows a placeholder pending Google Shared Drive integration. Once the integration is approved, the page will connect to the ICS Global Shared Drive via Google Workspace API. Access control will be managed through Google Workspace permissions configured by the IT Admin.

---

## Deployment

This project is configured for deployment on Vercel.

```bash
# Connect to Vercel
vercel

# Deploy to production
vercel --prod
```

Push to the connected GitHub repository to trigger automatic deployments.

---

## Notes

- Data added through the UI (announcements, SOPs) is stored in localStorage only. It does not persist across different browsers or devices. A backend integration will be required for production use.
- Image Gallery currently uses color placeholders. Actual images will be linked from Google Shared Drive after integration.
- The portal is designed for internal use only. Set appropriate access controls before sharing the production URL.
