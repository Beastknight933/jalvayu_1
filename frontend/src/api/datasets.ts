import { apiClient } from './apiClient';

export interface Dataset {
    id: string;
    name: string;
    source: string;
    variable: string;
    frequency: string;
    status: string;
    created_at: string;
    metadata: Record<string, unknown>;
}

export const datasetsApi = {
    getAll: async () => {
        const response = await apiClient.get<{ data: Dataset[] }>('/datasets/');
        return response.data.data;
    },
    
    getById: async (id: string) => {
        const response = await apiClient.get<{ data: Dataset }>(`/datasets/${id}`);
        return response.data.data;
    },
    
    sync: async (source: string) => {
        const response = await apiClient.post(`/datasets/sync/${source}`);
        return response.data;
    }
};
