import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
// import { server } from './mocks/server'; // Will implement MSW server later

beforeAll(() => {
    // server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
    // server.resetHandlers();
    cleanup();
});

afterAll(() => {
    // server.close();
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));
