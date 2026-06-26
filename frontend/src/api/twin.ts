import { apiClient } from './apiClient';

export interface TwinStatus {
    engine_state: 'active' | 'standby' | 'maintenance';
    active_workers: number;
    loaded_dataset: string;
    memory_usage_mb: number;
    last_sync: string;
    config: {
        resolution: string;
        cache_enabled: boolean;
        default_model: string;
    }
}

export const twinApi = {
    getStatus: async () => {
        const response = await apiClient.get<{ data: TwinStatus }>('/twin/status');
        return response.data.data;
    },

    updateConfig: async (config: Partial<TwinStatus['config']>) => {
        const response = await apiClient.patch<{ data: TwinStatus }>('/twin/config', config);
        return response.data.data;
    }
};
