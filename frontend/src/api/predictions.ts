import { apiClient } from './apiClient';

export interface Prediction {
    id: string;
    model_name: string;
    target_date: string;
    variable: string;
    value: number;
    confidence: number;
    status: 'pending' | 'completed' | 'failed';
    created_at: string;
}

export const predictionsApi = {
    getLatestPredictions: async (variable?: string) => {
        const params = variable ? { variable } : {};
        const response = await apiClient.get<{ data: Prediction[] }>('/predictions/latest', { params });
        return response.data.data;
    },

    getForecast: async (horizon_days: number) => {
        const response = await apiClient.get<{ data: Prediction[] }>(`/predictions/forecast?days=${horizon_days}`);
        return response.data.data;
    },

    comparePredictions: async (id1: string, id2: string) => {
        const response = await apiClient.get<{ data: unknown }>(`/predictions/compare?id1=${id1}&id2=${id2}`);
        return response.data.data;
    }
};
