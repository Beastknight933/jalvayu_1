import { apiClient } from './apiClient';

export interface SimulationParams {
    scenario_name: string;
    description?: string;
    region: string;
    duration_days: number;
    model_name: string;
    dataset_version: string;
    variables: Record<string, number>; // e.g., { rainfall: 10, temperature: 2 } (deltas/adjustments)
}

export interface SimulationJob {
    id: string;
    scenario_name: string;
    status: 'queued' | 'running' | 'completed' | 'failed';
    progress: number;
    created_at: string;
    params: SimulationParams;
    results?: Record<string, unknown>;
}

export const simulationsApi = {
    getAll: async () => {
        const response = await apiClient.get<{ data: SimulationJob[] }>('/simulations');
        return response.data.data;
    },

    getById: async (id: string) => {
        const response = await apiClient.get<{ data: SimulationJob }>(`/simulations/${id}`);
        return response.data.data;
    },

    create: async (params: SimulationParams) => {
        const response = await apiClient.post<{ data: SimulationJob }>('/simulations', params);
        return response.data.data;
    },

    delete: async (id: string) => {
        await apiClient.delete(`/simulations/${id}`);
    },

    getLogs: async (id: string) => {
        const response = await apiClient.get<{ data: string[] }>(`/simulations/${id}/logs`);
        return response.data.data;
    }
};
