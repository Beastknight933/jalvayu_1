'use client';

import React from 'react';
import { Source, Layer, LayerProps } from 'react-map-gl/maplibre';
import { MapLayer } from '@/stores/useMapStore';

interface ClimateLayerProps {
    layer: MapLayer;
}

export function ClimateLayer({ layer }: ClimateLayerProps) {
    // Determine the source type based on the layer configuration
    // In a production environment, this would fetch WMS/WMTS or generated raster tiles from the backend

    // Mock raster tile source for demonstration purposes
    const rasterSource = {
        type: 'raster' as const,
        tiles: [
            // Using a placeholder tile service for the demonstration
            // Later this will point to our backend FastAPI tile server e.g., `/api/v1/tiles/{layer.id}/{z}/{x}/{y}.png`
            layer.url || `https://api.placeholder.com/tiles/${layer.id}/{z}/{x}/{y}.png`
        ],
        tileSize: 256
    };

    const rasterLayerStyle: LayerProps = {
        id: `climate-${layer.id}`,
        type: 'raster',
        source: `source-${layer.id}`,
        paint: {
            'raster-opacity': layer.opacity,
            'raster-fade-duration': 300
        }
    };

    return (
        <Source id={`source-${layer.id}`} {...rasterSource}>
            <Layer {...rasterLayerStyle} />
        </Source>
    );
}
