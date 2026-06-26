# Climate Digital Twin | Frontend

The frontend interface for the AI-Powered Digital Twin of India's Climate.

This repository is completely independent from the backend. It communicates exclusively via REST APIs and WebSockets to the `api/v1` routes. No business logic, climate models, or database queries are handled in this repository.

---

## 🏗 Frontend Architecture Overview

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (v4) with shadcn/ui components
* **State Management:** Zustand (Global State) + React Query (Server State)
* **API Client:** Axios (with interceptors for JWT injection and auto-refresh)
* **Real-time Engine:** Native WebSocket API
* **Mapping:** MapLibre GL JS
* **Charts:** Recharts
* **Testing:** Vitest + React Testing Library

## ⚙️ Environment Variable Documentation

Copy `.env.example` to `.env.local` to configure your environment.

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL for the backend REST API (e.g., `http://localhost:8000/api/v1`) |
| `NEXT_PUBLIC_WS_URL` | Base URL for the backend WebSockets (e.g., `ws://localhost:8000/api/v1/ws`) |
| `NEXT_PUBLIC_APP_NAME` | Name displayed in the UI / Headers |
| `NEXT_PUBLIC_MAP_STYLE` | JSON URL for the MapLibre base map style |
| `NEXT_PUBLIC_ENVIRONMENT` | Set to `development`, `staging`, or `production` |
| `NEXT_PUBLIC_ENABLE_ANALYTICS`| Toggle UI analytics on/off (`true`/`false`) |

*Note: All environment variables must be prefixed with `NEXT_PUBLIC_` to be exposed to the browser. Do not place backend secrets in this repository.*

## 🚀 Development Guide

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Ensure `.env.local` is correctly pointing to a running backend instance.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

### Development Standards
- **No Direct Fetch:** Use the central `apiClient` exported from `src/api/apiClient.ts` for all HTTP requests to ensure JWTs are injected.
- **Client-Side Rendering:** Because we rely heavily on WebSockets and dynamic maps, many complex UI components (Maps, Charts) use `"use client"`.

## 🧪 Testing Documentation

We use Vitest and React Testing Library for frontend testing.

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run ESLint validation
npm run lint

# Run TypeScript type check
npm run typecheck
```

## ☁️ Vercel Deployment Documentation

This Next.js application is designed to be deployed directly to Vercel.

### Prerequisites
- A Vercel Account
- A deployed Render/FastAPI backend to connect to.

### Steps to Deploy
1. **Connect Repository**: Import this GitHub repository into your Vercel dashboard.
2. **Framework Preset**: Ensure "Next.js" is selected.
3. **Environment Variables**: Add all the variables from `.env.example` directly into the Vercel Project Settings. Ensure `NEXT_PUBLIC_API_URL` points to your production Render URL (e.g., `https://api.climatetwin.example.com/api/v1`).
4. **Deploy**: Click Deploy. Vercel will automatically build the Next.js application.

### CI/CD
A GitHub Actions workflow (`.github/workflows/cd.yml`) is included to automate Vercel deployments. It requires `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` secrets to be configured in GitHub.

### Troubleshooting
- **API CORS Errors**: Ensure the backend's `CORS_ORIGINS` environment variable includes your `.vercel.app` domain.
- **WebSocket Disconnects**: Ensure the Vercel domain uses `wss://` instead of `ws://` in production via the `NEXT_PUBLIC_WS_URL`.

## 🤝 Contribution Guide

1. Branch from `main` (e.g., `feature/awesome-maps`).
2. Ensure you have no linting warnings (`npm run lint`).
3. Ensure the project builds locally (`npm run build`).
4. Submit a Pull Request. CI will run Vitest and ESLint automatically.
