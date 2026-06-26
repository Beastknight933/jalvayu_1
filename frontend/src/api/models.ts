import { apiClient } from './apiClient';

export interface ModelMetrics {
    model_name: string;
    version: string;
    mae: number;
    rmse: number;
    mape: number;
    r2: number;
    last_trained: string;
}

export const modelsApi = {
    getMetrics: async () => {
        const response = await apiClient.get<{ data: ModelMetrics[] }>('/models/metrics');
        return response.data.data;
    },

    getModelHistory: async (modelName: string) => {
        const response = await apiClient.get<{ data: unknown[] }>(`/models/${modelName}/history`);
        return response.data.data;
    }
};
