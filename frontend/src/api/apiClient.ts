import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Create the centralized Axios instance
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 30 seconds global timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle automatic token refresh and global errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;
        
        // Ensure originalRequest is defined and we haven't already retried
        type RetryableRequest = typeof originalRequest & { _retry?: boolean };
        const request = originalRequest as RetryableRequest;
        if (error.response?.status === 401 && request && !request._retry) {
            request._retry = true;
            
            try {
                // Attempt to refresh the token
                // NOTE: We assume the backend expects a refresh token via cookie or explicit payload
                const refreshToken = useAuthStore.getState().refreshToken;
                
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }
                
                const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refresh_token: refreshToken
                });
                
                const { access_token } = response.data.data;
                
                // Update Zustand store
                useAuthStore.getState().setTokens(access_token, refreshToken);
                
                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
                return apiClient(originalRequest);
                
            } catch (refreshError) {
                // Refresh failed, logout the user
                useAuthStore.getState().logout();
                // Optionally trigger a global event or redirect to login
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }
        
        // Handle rate limiting (429) globally
        if (error.response?.status === 429) {
            console.warn("Rate limit exceeded. Please wait.");
        }
        
        return Promise.reject(error);
    }
);
