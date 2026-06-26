import { useAuthStore } from '@/stores/useAuthStore';
import { apiClient, API_BASE_URL } from './apiClient';

type WebSocketMessageHandler = (data: unknown) => void;

class WebSocketService {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectTimeout = 1000;
    private url: string;
    private handlers: Map<string, Set<WebSocketMessageHandler>> = new Map();
    private isConnecting = false;
    
    constructor() {
        // Convert http(s) to ws(s)
        this.url = API_BASE_URL.replace(/^http/, 'ws').replace(/\/api\/v1$/, '/ws');
    }

    public connect = async () => {
        if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) return;
        
        this.isConnecting = true;
        
        try {
            const token = useAuthStore.getState().accessToken;
            if (!token) {
                console.warn('Cannot connect to WebSocket: No access token available');
                this.isConnecting = false;
                return;
            }

            // In FastAPI, usually token is passed via query param or initial message. 
            // We'll use query param for the initial handshake.
            this.ws = new WebSocket(`${this.url}/dashboard?token=${token}`);

            this.ws.onopen = this.handleOpen;
            this.ws.onmessage = this.handleMessage;
            this.ws.onclose = this.handleClose;
            this.ws.onerror = this.handleError;
        } catch (error) {
            console.error('WebSocket connection error:', error);
            this.isConnecting = false;
            this.scheduleReconnect();
        }
    };

    public disconnect = () => {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    };

    public subscribe = (eventType: string, handler: WebSocketMessageHandler) => {
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, new Set());
        }
        this.handlers.get(eventType)?.add(handler);
    };

    public unsubscribe = (eventType: string, handler: WebSocketMessageHandler) => {
        const typeHandlers = this.handlers.get(eventType);
        if (typeHandlers) {
            typeHandlers.delete(handler);
        }
    };

    private handleOpen = () => {
        console.log('WebSocket connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.reconnectTimeout = 1000; // Reset backoff
    };

    private handleMessage = (event: MessageEvent) => {
        try {
            const payload = JSON.parse(event.data);
            const { type, data } = payload;
            
            if (type && this.handlers.has(type)) {
                this.handlers.get(type)?.forEach(handler => handler(data));
            } else if (this.handlers.has('any')) {
                // Global handler
                this.handlers.get('any')?.forEach(handler => handler(payload));
            }
        } catch (err) {
            console.error('Failed to parse WebSocket message', err);
        }
    };

    private handleClose = async (event: CloseEvent) => {
        console.log('WebSocket disconnected', event.code, event.reason);
        this.ws = null;
        this.isConnecting = false;
        
        // Code 1008 is Policy Violation (Unauthorized), might need token refresh
        if (event.code === 1008 || event.code === 4001) {
            await this.refreshTokenAndReconnect();
        } else {
            this.scheduleReconnect();
        }
    };

    private handleError = (event: Event) => {
        console.error('WebSocket error:', event);
    };

    private scheduleReconnect = () => {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('WebSocket max reconnect attempts reached');
            return;
        }

        setTimeout(() => {
            console.log(`Reconnecting WebSocket... Attempt ${this.reconnectAttempts + 1}`);
            this.reconnectAttempts++;
            this.reconnectTimeout *= 2; // Exponential backoff
            this.connect();
        }, this.reconnectTimeout);
    };

    private refreshTokenAndReconnect = async () => {
        try {
            // Use the API client to trigger a token refresh (it intercepts and refreshes)
            // Or call refresh directly
            const refreshToken = useAuthStore.getState().refreshToken;
            if (!refreshToken) throw new Error("No refresh token");
            
            const response = await apiClient.post('/auth/refresh', { refresh_token: refreshToken });
            const { access_token } = response.data.data;
            useAuthStore.getState().setTokens(access_token, refreshToken);
            
            this.reconnectAttempts = 0;
            this.connect();
        } catch {
            console.error("Failed to refresh token for WebSocket reconnection");
            useAuthStore.getState().logout();
        }
    };
}

// Export a singleton instance
export const wsService = new WebSocketService();
