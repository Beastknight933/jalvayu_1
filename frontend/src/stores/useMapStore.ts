import { create } from 'zustand';

export interface ViewState {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
}

export interface MapLayer {
    id: string;
    name: string;
    type: 'raster' | 'vector' | 'geojson';
    visible: boolean;
    opacity: number;
    url?: string;
    data?: unknown;
}

interface MapState {
    viewState: ViewState;
    layers: MapLayer[];
    
    // Actions
    setViewState: (viewState: Partial<ViewState>) => void;
    toggleLayer: (layerId: string) => void;
    setLayerOpacity: (layerId: string, opacity: number) => void;
    addLayer: (layer: MapLayer) => void;
}

export const useMapStore = create<MapState>((set) => ({
    // Center roughly on India
    viewState: {
        longitude: 78.9629,
        latitude: 20.5937,
        zoom: 4,
        pitch: 0,
        bearing: 0,
    },
    layers: [
        {
            id: 'rainfall',
            name: 'Daily Rainfall',
            type: 'raster',
            visible: true,
            opacity: 0.7,
        },
        {
            id: 'temperature',
            name: 'Max Temperature',
            type: 'raster',
            visible: false,
            opacity: 0.7,
        }
    ],

    setViewState: (newViewState) => 
        set((state) => ({ viewState: { ...state.viewState, ...newViewState } })),
        
    toggleLayer: (layerId) => 
        set((state) => ({
            layers: state.layers.map(layer => 
                layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
            )
        })),
        
    setLayerOpacity: (layerId, opacity) =>
        set((state) => ({
            layers: state.layers.map(layer =>
                layer.id === layerId ? { ...layer, opacity } : layer
            )
        })),
        
    addLayer: (layer) => 
        set((state) => ({ layers: [...state.layers, layer] })),
}));
