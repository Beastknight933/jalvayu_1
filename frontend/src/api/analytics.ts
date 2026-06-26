import { apiClient } from './apiClient';

export interface AnalyticsTrend {
    date: string;
    value: number;
    average?: number;
    anomaly?: number;
}

export const analyticsApi = {
    getTrends: async (variable: string, period: string) => {
        const response = await apiClient.get<{ data: AnalyticsTrend[] }>(`/analytics/trends`, {
            params: { variable, period }
        });
        return response.data.data;
    },

    getAnomalies: async (region?: string) => {
        const params = region ? { region } : {};
        const response = await apiClient.get<{ data: unknown[] }>(`/analytics/anomalies`, { params });
        return response.data.data;
    },
    
    getHistoricalState: async (date: string) => {
        const response = await apiClient.get<{ data: unknown }>(`/analytics/historical`, {
            params: { date }
        });
        return response.data.data;
    }
};
