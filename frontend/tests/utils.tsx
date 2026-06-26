import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new QueryClient for each test to avoid state leaking
const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export function renderWithProviders(
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) {
    const testQueryClient = createTestQueryClient();
    
    return render(
        <QueryClientProvider client={testQueryClient}>
            {ui}
        </QueryClientProvider>,
        options
    );
}

// Re-export everything
export * from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
