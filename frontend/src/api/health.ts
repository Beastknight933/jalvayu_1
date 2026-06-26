import { apiClient } from './apiClient';

export interface HealthStatus {
    api: 'healthy' | 'unhealthy';
    database: 'healthy' | 'unhealthy';
    redis: 'healthy' | 'unhealthy';
    celery: 'healthy' | 'unhealthy';
    timestamp: string;
}

export const healthApi = {
    getSystemHealth: async () => {
        const response = await apiClient.get<{ data: HealthStatus }>('/health/full');
        return response.data.data;
    }
};
