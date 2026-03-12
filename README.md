# Bharat Insight – AI Driven Data Platform

A production-quality Next.js 14 application for AI-powered Indian government data analytics.

## 🚀 Quick Start

```bash
npm install
cp .env.local.example .env.local
# Fill in your API keys
npm run dev
```

## 📁 Project Structure

```
bharat-insight/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/page.tsx    # Analytics dashboard
│   ├── auth/page.tsx         # Login page
│   ├── layout.tsx            # Root layout
│   └── providers.tsx         # React Query provider
├── components/
│   ├── landing/              # Landing page sections
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── BentoGrid.tsx
│   │   ├── ArchitectureSection.tsx
│   │   ├── AnalyticsPreview.tsx
│   │   └── Footer.tsx
│   ├── dashboard/            # Dashboard components
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   ├── DataGrid.tsx      # 100k row virtualized table
│   │   ├── AIPanel.tsx       # Gemini streaming panel
│   │   └── OrgSwitcher.tsx   # Multi-tenant switcher
│   └── shared/
│       └── CommandPalette.tsx # Ctrl+K palette
├── lib/
│   ├── dataset.ts            # Data generator (100k rows)
│   ├── departments.ts        # Department configs
│   ├── supabase.ts           # Supabase client
│   └── gemini.ts             # Gemini streaming API
├── store/
│   └── index.ts              # Zustand global store
├── types/
│   └── index.ts              # TypeScript types
└── styles/
    └── globals.css           # Global styles
```

## 🎯 Key Features

- **Landing Page**: Dark SaaS design with animations, live data feed, bento grid
- **Analytics Dashboard**: Sidebar + topbar + data grid + AI panel
- **Data Grid**: TanStack Table + React Virtual for 100k+ rows
- **AI Panel**: Google Gemini streaming insights with markdown rendering
- **Command Palette**: Ctrl+K navigation and department switching
- **Multi-Tenant**: Organization switcher with dept-specific themes
- **RBAC**: Admin (edit/delete) and Viewer (read-only) roles
- **Auth**: Supabase authentication integration

## 🔑 Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=        # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Your Supabase anon key
NEXT_PUBLIC_GEMINI_API_KEY=      # Google Gemini API key
```

Without the Gemini key, the AI panel uses a demo simulation.

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + custom CSS |
| Animation | Framer Motion |
| State | Zustand |
| Data Fetching | TanStack Query |
| Table | TanStack Table + Virtual |
| Auth | Supabase |
| AI | Google Gemini 1.5 Flash |
| Charts | Recharts |
