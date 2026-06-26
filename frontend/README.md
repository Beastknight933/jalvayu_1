# Climate Digital Twin | Frontend

The frontend for the AI-Powered Digital Twin of India's Climate.

This repository is completely separate from the backend and communicates exclusively via REST APIs and WebSockets to the `api/v1` routes.

## Architecture

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (v4) with shadcn/ui components
* **State Management:** Zustand (Global State) + React Query (Server State)
* **API Client:** Axios (with interceptors for JWT injection and auto-refresh)
* **Mapping:** Leaflet / MapLibre GL
* **Charts:** Recharts
* **Testing:** Vitest + React Testing Library + MSW

## Getting Started

1. Set up the environment variables:
   ```bash
   cp .env.example .env.local
   ```
   *Ensure `NEXT_PUBLIC_API_URL` points to your backend instance.*

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Standards

- **Never** fetch data directly inside a React Server Component using `fetch()` if it bypasses the Axios interceptor logic. 
- Use the central `apiClient` exported from `src/api/apiClient.ts` for all requests.
- All domain logic should reside in the backend. The frontend is exclusively an presentation and interaction layer.
