# Roche Lab Reserve Hub

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/KibetuMaureen/roche-lab-reserve-hub)

A modern web application for managing laboratory equipment bookings, reporting issues, and viewing analytics, built for Roche labs. This project streamlines lab operations, improves equipment utilization, and provides actionable insights for lab managers and users.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

**Roche Lab Reserve Hub** is a full-featured platform for:
- Booking lab equipment
- Managing and tracking reservations
- Reporting and tracking equipment issues
- Viewing lab analytics and usage trends

The application is designed for both lab users and managers, with role-based access to advanced analytics and management features.

---

## Features

- **User Authentication**: Secure sign-up, login, and session management (Supabase Auth)
- **Equipment Booking**: Reserve lab equipment, view availability, and manage your bookings
- **Issue Reporting**: Report problems with equipment, track issue status, and view instrument details
- **Analytics Dashboard**: Visualize equipment usage, booking trends, and lab activity (for managers)
- **System Announcements**: Stay updated with lab-wide notifications and maintenance alerts
- **Responsive UI**: Modern, mobile-friendly interface using shadcn-ui and Tailwind CSS

---

## Demo

https://github.com/user-attachments/assets/242da25c-b5a7-40df-bc31-72cb3a0c9174

---

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI**: shadcn-ui, Tailwind CSS
- **State/Data**: React Query, Supabase (for auth and database)
- **Charts**: recharts
- **PDF/CSV Export**: jsPDF, PapaParse

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd roche-lab-reserve-hub

# 2. Install dependencies
npm install

# 3. Set up environment variables
# (Configure your Supabase project and add credentials if needed)

# 4. Start the development server
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

---

## Available Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Lint the codebase

---

## Project Structure

```
roche-lab-reserve-hub/
├── public/                # Static assets (images, favicon, etc.)
├── src/
│   ├── components/        # Reusable UI and feature components
│   ├── hooks/             # Custom React hooks
│   ├── integrations/      # Supabase client and types
│   ├── lib/               # Utility functions
│   ├── pages/             # Route-based pages
│   └── main.tsx           # App entry point
├── supabase/              # Supabase config and migrations
├── package.json           # Project metadata and scripts
├── tailwind.config.ts     # Tailwind CSS config
└── README.md              # Project documentation
```

---

## Deployment

You can deploy this app to any static hosting provider after building:

```sh
npm run build
```

The output will be in the `dist/` folder. Deploy this folder to your preferred hosting (e.g., Vercel, Netlify, GitHub Pages).

For custom domain setup and advanced deployment, see the [Vite documentation](https://vitejs.dev/guide/static-deploy.html).

---

## License

This project was completed as a Capstone project for educational purposes.

---

