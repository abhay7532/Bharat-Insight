Bharat-Insight – AI Driven Public Data Analytics Platform

Overview

Bharat-Insight is a multi-tenant analytics platform built using Indian
public datasets from Data.gov.in. The platform combines high‑performance
data visualization, real‑time AI insights, and modern UI design to help
users explore large datasets efficiently.

The project demonstrates scalable frontend engineering with virtualized
data grids, contextual AI analysis, and dynamic tenant-based UI
switching.

------------------------------------------------------------------------

1. Data Handling Strategy

Data Source

Datasets are obtained from the Government of India open data platform
such as: - Literacy statistics - Agricultural output - State GDP
contribution - Health index data

These datasets are normalized into a consistent structure:

{ state: string year: number literacyRate: number gdpContribution:
number healthIndex: number }

Data Processing

The platform ensures performance using:

-   Client-side caching with TanStack Query
-   Global state management using Zustand
-   Memoized filtering for fast queries
-   Sampling data for AI context generation

Only a small sample of filtered rows is passed to the AI model to reduce
API token usage while keeping responses contextual.

------------------------------------------------------------------------

2. Design Standards & UI System

The UI follows modern SaaS dashboard design principles.

Design Philosophy

-   Minimalist dark mode interface
-   High contrast readability
-   Smooth micro‑interactions
-   Clean spacing and typography

UI Features

Hero Section: - Streaming text animation - Animated preview charts

Bento Grid: - Feature grid presenting major platform capabilities

Animations: - Scroll reveal animations - AI streaming indicators -
Smooth page transitions

Typography: - Inter / Geist modern sans-serif fonts

Performance targets: - Lighthouse score 95+ - Zero CLS (Cumulative
Layout Shift) - Lazy loading for components

------------------------------------------------------------------------

3. High‑Performance Data Grid (Virtualization)

Large datasets (100,000+ rows) are rendered using virtualization.

Problem: Rendering all rows at once causes slow performance and high
memory usage.

Solution: Only visible rows are rendered using windowed virtualization.

Benefits: - Smooth scrolling - Lower memory usage - Fast UI rendering

Features include: - Multi-column filtering (State, Year) - Fuzzy
search - Sticky headers - Keyboard navigation

------------------------------------------------------------------------

4. Multi‑Tenant Architecture

The dashboard supports department-based tenants such as:

-   Ministry of Health
-   Ministry of Agriculture
-   Ministry of Education

Tenant switching dynamically updates:

-   Dataset
-   Theme colors
-   Icons
-   Dashboard metrics

Implementation: Global tenant state is managed using Zustand.

Example structure:

tenantConfig = { health: { dataset: healthData, theme: “emerald”, icon:
“heart” }, agriculture: { dataset: agricultureData, theme: “green”,
icon: “leaf” } }

Switching tenants instantly updates UI without page refresh.

------------------------------------------------------------------------

5. AI Insight Panel (Gemini Integration)

The platform integrates AI insights using the Google Gemini API.

Workflow: 1. User submits a query. 2. Active filters from the data grid
are captured. 3. Dataset summary is generated. 4. The summary + user
query are sent to Gemini.

Prompt Design

Example structure:

You are a data analyst.

Dataset summary: Total rows: 120000 States included: Punjab, Haryana
Average literacy rate: 78.2%

User Query: Compare literacy trends between states.

This ensures AI responses remain context-aware.

Streaming Responses

AI responses stream token-by-token for a real-time feel. The UI shows a
“Thinking…” state before the final answer appears.

------------------------------------------------------------------------

6. Command Palette

A global command palette improves navigation.

Shortcut: Ctrl + K

Users can: - Navigate between pages - Switch tenants - Trigger analytics
actions - Access datasets quickly

------------------------------------------------------------------------

7. Authentication

Authentication is implemented using Supabase.

User roles:

Admin: - Edit data - Delete entries - Manage tenants

Viewer: - Read-only access - View analytics

Role-based UI ensures proper access control.

------------------------------------------------------------------------

8. Deployment

The project can be deployed using modern cloud platforms.

Environment variables required:

NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_GEMINI_API_KEY

------------------------------------------------------------------------

Conclusion

Bharat‑Insight demonstrates how modern frontend technologies combined
with AI can create scalable analytics platforms capable of handling
large public datasets while delivering real-time insights and excellent
user experience.
